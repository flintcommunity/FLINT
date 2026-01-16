import { NextRequest, NextResponse } from "next/server";
import { db } from "@server/db";
import { apps, sessions, users } from "@shared/schema";
import { eq, and, gt, desc } from "drizzle-orm";
import { postKindlingNotification } from "@server/discord";

async function getAuthenticatedUser(request: NextRequest) {
  const sessionToken = request.cookies.get("session_token")?.value;
  
  if (!sessionToken) {
    return null;
  }

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
    return null;
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, session.userId))
    .then(rows => rows[0]);

  return user;
}

export async function GET(request: NextRequest) {
  try {
    const allApps = await db
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
        userDiscordUsername: users.discordUsername,
      })
      .from(apps)
      .leftJoin(users, eq(apps.userId, users.id))
      .orderBy(desc(apps.createdAt));

    return NextResponse.json({ apps: allApps });
  } catch (error) {
    console.error("Error fetching apps:", error);
    return NextResponse.json({ error: "Failed to fetch apps" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const user = await getAuthenticatedUser(request);
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, logoUrl, description, appUrl, feedbackRequested, platforms, videoUrl, initialPrompt, githubUrl } = body;

    if (!name || !description || !appUrl || !feedbackRequested) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const [newApp] = await db.insert(apps).values({
      userId: user.id,
      name,
      logoUrl: logoUrl || null,
      description,
      appUrl,
      feedbackRequested,
      platforms: Array.isArray(platforms) ? platforms.join(",") : platforms || "",
      videoUrl: videoUrl || null,
      initialPrompt: initialPrompt || null,
      githubUrl: githubUrl || null,
    }).returning();

    postKindlingNotification({
      name,
      description,
      appUrl,
      feedbackRequested,
      creatorDiscordId: user.discordId,
      creatorDiscordUsername: user.discordUsername,
    }).catch((err) => console.error("Discord notification failed:", err));

    return NextResponse.json({ app: newApp });
  } catch (error) {
    console.error("Error creating app:", error);
    return NextResponse.json({ error: "Failed to create app" }, { status: 500 });
  }
}
