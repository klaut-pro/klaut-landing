# Deploy klaut-landing Next.js to IONOS VPS behind Caddy (klaut.pro / www)
# Requires: plink, pscp, IONOS_* + VPS_* in klaut.pro/.env.local (or sibling)
$ErrorActionPreference = "Stop"
$RepoRoot = Split-Path $PSScriptRoot -Parent
$MetaRoot = Join-Path (Split-Path $RepoRoot -Parent) "klaut.pro"
$EnvFile = Join-Path $MetaRoot ".env.local"
if (-not (Test-Path $EnvFile)) {
  $EnvFile = Join-Path $RepoRoot ".env.local"
}
if (-not (Test-Path $EnvFile)) { throw ".env.local not found" }

function Get-EnvValue([string]$Key) {
  foreach ($line in Get-Content $EnvFile -Encoding UTF8) {
    if ($line -match "^\s*#") { continue }
    if ($line -match "^\s*$([regex]::Escape($Key))\s*=\s*(.*)\s*$") {
      return $Matches[1].Trim().Trim('"').Trim("'")
    }
  }
  return $null
}

$VpsIp = Get-EnvValue "VPS_IP"
$VpsUser = Get-EnvValue "VPS_USER"
$VpsPass = Get-EnvValue "VPS_PASSWORD"
$HostKey = Get-EnvValue "VPS_HOSTKEY"
$IonosKey = Get-EnvValue "IONOS_API_KEY"
$IonosSecret = Get-EnvValue "IONOS_API_SECRET"
if (-not ($VpsIp -and $VpsUser -and $VpsPass -and $HostKey)) { throw "VPS_* missing" }
if (-not ($IonosKey -and $IonosSecret)) { throw "IONOS_* missing" }

$Plink = "C:\Program Files\PuTTY\plink.exe"
$Pscp = "C:\Program Files\PuTTY\pscp.exe"
$RemoteDir = "/opt/klaut-landing"

Write-Host "Preparing remote dir..."
& $Plink -batch -ssh "$VpsUser@$VpsIp" -pw $VpsPass -hostkey $HostKey "mkdir -p $RemoteDir/deploy"

Write-Host "Uploading app (excluding node_modules/.next)..."
$staging = Join-Path $env:TEMP "klaut-landing-deploy"
if (Test-Path $staging) { Remove-Item -Recurse -Force $staging }
New-Item -ItemType Directory -Path $staging | Out-Null
robocopy $RepoRoot $staging /E /XD node_modules .next .git _archive-static /NFL /NDL /NJH /NJS /nc /ns /np | Out-Null
& $Pscp -batch -r -pw $VpsPass -hostkey $HostKey `
  "$staging\*" `
  "${VpsUser}@${VpsIp}:${RemoteDir}/"
Remove-Item -Recurse -Force $staging

# LF remote build/caddy script (plink here-strings on Windows inject CRLF and break bash)
$remoteScript = @"
#!/bin/bash
set -euo pipefail
cd $RemoteDir
docker compose -f deploy/docker-compose.yml build
docker compose -f deploy/docker-compose.yml up -d
CID=`$(docker compose -f deploy/docker-compose.yml ps -q klaut-landing)
docker network connect cloud-pro "`$CID" 2>/dev/null || true
docker ps --filter name=klaut-landing --format '{{.Names}} {{.Status}}'
CADDY=/opt/cloud-pro/Caddyfile
if ! grep -qE '^klaut\.pro' "`$CADDY"; then
  printf '\nklaut.pro, www.klaut.pro {\n  encode gzip\n  reverse_proxy klaut-landing:3000\n}\n' >> "`$CADDY"
fi
cd /opt/cloud-pro
docker compose exec -T caddy caddy reload --config /etc/caddy/Caddyfile || docker compose restart caddy
echo DONE
"@
$remoteScript = $remoteScript -replace "`r`n", "`n"
$localRemote = Join-Path $env:TEMP "klaut-landing-remote-build.sh"
[System.IO.File]::WriteAllText($localRemote, $remoteScript)
& $Pscp -batch -pw $VpsPass -hostkey $HostKey $localRemote "${VpsUser}@${VpsIp}:${RemoteDir}/remote-build.sh"
Write-Host "Build + start container + Caddy..."
& $Plink -batch -ssh "$VpsUser@$VpsIp" -pw $VpsPass -hostkey $HostKey "chmod +x $RemoteDir/remote-build.sh && $RemoteDir/remote-build.sh"

Write-Host "Upsert IONOS DNS for apex + www..."
$headers = @{
  "X-API-Key" = "${IonosKey}.${IonosSecret}"
  "Accept" = "application/json"
  "Content-Type" = "application/json"
}
$zoneId = "35141304-29c5-11f1-9ceb-0a5864440d65"
$detail = Invoke-RestMethod -Uri "https://api.hosting.ionos.com/dns/v1/zones/$zoneId" -Headers $headers

function Remove-Type([string]$Name, [string]$Type) {
  $matches = @($detail.records) | Where-Object { $_.name -eq $Name -and $_.type -eq $Type }
  foreach ($rec in $matches) {
    Invoke-RestMethod -Method DELETE -Uri "https://api.hosting.ionos.com/dns/v1/zones/$zoneId/records/$($rec.id)" -Headers $headers | Out-Null
    Write-Host "Deleted $Type $Name $($rec.id)"
  }
}

function Upsert-A([string]$Name, [string]$Ip) {
  $existing = @($detail.records) | Where-Object { $_.name -eq $Name -and $_.type -eq "A" }
  $payloadObj = @{ name = $Name; type = "A"; content = $Ip; ttl = 300; disabled = $false }
  if ($existing.Count -gt 0) {
    $first = $existing[0]
    Invoke-RestMethod -Method PUT -Uri "https://api.hosting.ionos.com/dns/v1/zones/$zoneId/records/$($first.id)" -Headers $headers -Body ($payloadObj | ConvertTo-Json -Compress) | Out-Null
    Write-Host "Updated A $Name $($first.id)"
    foreach ($rec in $existing | Select-Object -Skip 1) {
      Invoke-RestMethod -Method DELETE -Uri "https://api.hosting.ionos.com/dns/v1/zones/$zoneId/records/$($rec.id)" -Headers $headers | Out-Null
      Write-Host "Removed duplicate A $Name $($rec.id)"
    }
  } else {
    $body = ConvertTo-Json @($payloadObj) -Depth 5 -Compress
    Invoke-RestMethod -Method POST -Uri "https://api.hosting.ionos.com/dns/v1/zones/$zoneId/records" -Headers $headers -Body $body | Out-Null
    Write-Host "Created A $Name"
  }
}

Remove-Type "klaut.pro" "AAAA"
Remove-Type "www.klaut.pro" "AAAA"
Remove-Type "www.klaut.pro" "CNAME"
Upsert-A "klaut.pro" $VpsIp
# refresh zone after mutations
$detail = Invoke-RestMethod -Uri "https://api.hosting.ionos.com/dns/v1/zones/$zoneId" -Headers $headers
Upsert-A "www.klaut.pro" $VpsIp

Write-Host "Done. Verify https://klaut.pro and https://www.klaut.pro (DNS TTL may lag)"
