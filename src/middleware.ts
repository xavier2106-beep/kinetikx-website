import { NextRequest, NextResponse } from "next/server";

// Simple PIN gate for staging.kinetikx.com — set GATE_PIN in env, 24h cookie.
// XGL directive 2026-11-02 msg 9007 : gate the staging site behind a PIN.

const COOKIE_NAME = "kkx_gate";
const PIN = process.env.GATE_PIN || "";

export function middleware(req: NextRequest) {
  // No PIN set → gate disabled (local dev). Fail open.
  if (!PIN) return NextResponse.next();

  const { pathname } = req.nextUrl;

  // Always allow gate assets, Next internals, API, static files.
  if (
    pathname.startsWith("/gate") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/gate") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  if (cookie && cookie === PIN) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = "/gate";
  url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
