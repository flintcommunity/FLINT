import { NextRequest, NextResponse } from "next/server";
import { db } from "@server/db";
import { sessions } from "@shared/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const sessionToken = request.cookies.get("session_token")?.value;
  
  if (sessionToken) {
    await db.delete(sessions).where(eq(sessions.sessionToken, sessionToken));
  }

  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.delete("session_token");
  
  return response;
}
