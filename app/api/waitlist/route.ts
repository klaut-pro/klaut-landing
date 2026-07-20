import { NextRequest, NextResponse } from "next/server";

const WAITLIST_API = "https://waitlist.klaut.pro/v1/signup";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  try {
    const res = await fetch(WAITLIST_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({ ok: false }));
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ ok: false, error: "upstream_unreachable" }, { status: 502 });
  }
}
