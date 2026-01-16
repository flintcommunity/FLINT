import { NextRequest, NextResponse } from "next/server";
import { db } from "@server/db";
import { apps, users } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const firewoodApps = await db
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

    return NextResponse.json({ apps: firewoodApps });
  } catch (error) {
    console.error("Error fetching firewood apps:", error);
    return NextResponse.json({ error: "Failed to fetch apps" }, { status: 500 });
  }
}
