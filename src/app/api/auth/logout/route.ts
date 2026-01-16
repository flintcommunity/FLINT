import { NextRequest, NextResponse } from "next/server";
import { db } from "@server/db";
import { sessions } from "@shared/schema";
import { eq } from "drizzle-orm";

function getBaseUrl() {
  if (process.env.PRODUCTION_URL) {
    return process.env.PRODUCTION_URL;
  }
  if (process.env.REPLIT_DEV_DOMAIN) {
    return `https://${process.env.REPLIT_DEV_DOMAIN}`;
  }
  return "http://localhost:5000";
}

export async function POST(request: NextRequest) {
  const sessionToken = request.cookies.get("session_token")?.value;
  
  if (sessionToken) {
    await db.delete(sessions).where(eq(sessions.sessionToken, sessionToken));
  }

  const baseUrl = getBaseUrl();
  const response = NextResponse.redirect(`${baseUrl}/`);
  response.cookies.set("session_token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: new Date(0),
    path: "/",
  });
  
  return response;
}
