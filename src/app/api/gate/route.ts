import { NextRequest, NextResponse } from "next/server";

// XGL directive 2026-11-02 msg 9007 : PIN gate endpoint.
// Accepts the posted PIN, sets cookie if valid, redirects.

const COOKIE_NAME = "kkx_gate";
const PIN = process.env.GATE_PIN || "";
const COOKIE_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

export async function POST(req: NextRequest) {
  if (!PIN) {
    return NextResponse.json({ ok: false, reason: "gate_disabled" }, { status: 503 });
  }
  const form = await req.formData();
  const pin = String(form.get("pin") || "").trim();
  const from = String(form.get("from") || "/") || "/";
  const safeFrom = from.startsWith("/") && !from.startsWith("//") ? from : "/";

  if (pin !== PIN) {
    const url = req.nextUrl.clone();
    url.pathname = "/gate";
    url.searchParams.set("from", safeFrom);
    url.searchParams.set("e", "1");
    return NextResponse.redirect(url, { status: 303 });
  }

  const dest = req.nextUrl.clone();
  dest.pathname = safeFrom;
  dest.search = "";
  const res = NextResponse.redirect(dest, { status: 303 });
  res.cookies.set({
    name: COOKIE_NAME,
    value: PIN,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_TTL_SECONDS,
  });
  return res;
}
