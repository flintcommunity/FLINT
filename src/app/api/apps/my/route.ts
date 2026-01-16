import { NextRequest, NextResponse } from "next/server";
import { db } from "@server/db";
import { sessions, users, apps } from "@shared/schema";
import { eq, and, gt, desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const sessionToken = request.cookies.get("session_token")?.value;
  
  if (!sessionToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userApps = await db
      .select({
        id: apps.id,
        name: apps.name,
        logoUrl: apps.logoUrl,
        description: apps.description,
        appUrl: apps.appUrl,
        feedbackRequested: apps.feedbackRequested,
        platforms: apps.platforms,
        videoUrl: apps.videoUrl,
        initialPrompt: apps.initialPrompt,
        createdAt: apps.createdAt,
        userId: apps.userId,
      })
      .from(apps)
      .where(eq(apps.userId, session.userId))
      .orderBy(desc(apps.createdAt));

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session.userId))
      .then(rows => rows[0]);

    const appsWithUser = userApps.map(app => ({
      ...app,
      userDiscordUsername: user?.discordUsername || null,
      userDiscordAvatar: user?.discordAvatar || null,
    }));

    return NextResponse.json({ apps: appsWithUser });
  } catch (error) {
    console.error("Error fetching user apps:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
