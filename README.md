# @klaut-pro/klaut-landing

Next.js App Router marketing site for [klaut.pro](https://klaut.pro): waitlist, blog, Majico brand tokens.

## Stack

- Next.js 15 (App Router, standalone output)
- IBM Plex Sans / Serif, accent `#6a2800` (Majico project `708a0dc5-7198-4fc5-9875-c45bc611d24a`)
- Waitlist POST → `https://waitlist.klaut.pro/v1/signup`
- Deploy: Docker on IONOS VPS, Caddy on `cloud-pro` network

## Develop

```bash
npm ci
npm run dev
```

## Deploy

From a machine with PuTTY `plink`/`pscp` and `klaut.pro/.env.local` (`VPS_*`, `IONOS_*`):

```powershell
.\deploy\deploy.ps1
```

## Structure

```
app/                 # routes + globals.css (tokens + motion)
components/          # Hero, Modules, Proof, BlogTeasers, WaitlistForm, motion/*
content/blog/        # article modules
deploy/              # Dockerfile, compose, deploy.ps1
```
