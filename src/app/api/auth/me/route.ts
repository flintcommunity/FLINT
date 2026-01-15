import { NextRequest, NextResponse } from "next/server";
import { db } from "@server/db";
import { sessions, users } from "@shared/schema";
import { eq, and, gt } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const sessionToken = request.cookies.get("session_token")?.value;
  
  if (!sessionToken) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    const session = await db
      .select()
      .from(sessions)
      .where(
        and(
          eq(sessions.sessionToken, sessionToken),
          gt(sessions.expiresAt, new Date())
        )
      )
      .then(rows => rows[0]);

    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session.userId))
      .then(rows => rows[0]);

    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        email: user.email,
        discordUsername: user.discordUsername,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
