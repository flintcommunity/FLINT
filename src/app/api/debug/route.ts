import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const sessionToken = request.cookies.get("session_token")?.value;
  const allCookies = request.cookies.getAll();
  
  return NextResponse.json({
    hasSessionToken: !!sessionToken,
    sessionTokenLength: sessionToken?.length || 0,
    cookieCount: allCookies.length,
    cookieNames: allCookies.map(c => c.name),
    hasProductionUrl: !!process.env.PRODUCTION_URL,
    productionUrl: process.env.PRODUCTION_URL ? "***set***" : "not set",
    hasDevDomain: !!process.env.REPLIT_DEV_DOMAIN,
    requestHost: request.headers.get("host"),
    requestOrigin: request.headers.get("origin"),
  });
}
