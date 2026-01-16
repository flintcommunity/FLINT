import { NextRequest, NextResponse } from "next/server";
import { db } from "@server/db";
import { apps, sessions, users } from "@shared/schema";
import { eq, and, gt } from "drizzle-orm";

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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthenticatedUser(request);
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const appId = parseInt(id);
    
    if (isNaN(appId)) {
      return NextResponse.json({ error: "Invalid app ID" }, { status: 400 });
    }

    const app = await db
      .select()
      .from(apps)
      .where(eq(apps.id, appId))
      .then(rows => rows[0]);

    if (!app) {
      return NextResponse.json({ error: "App not found" }, { status: 404 });
    }

    if (app.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ app });
  } catch (error) {
    console.error("Error fetching app:", error);
    return NextResponse.json({ error: "Failed to fetch app" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthenticatedUser(request);
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const appId = parseInt(id);
    
    if (isNaN(appId)) {
      return NextResponse.json({ error: "Invalid app ID" }, { status: 400 });
    }

    const existingApp = await db
      .select()
      .from(apps)
      .where(eq(apps.id, appId))
      .then(rows => rows[0]);

    if (!existingApp) {
      return NextResponse.json({ error: "App not found" }, { status: 404 });
    }

    if (existingApp.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { name, logoUrl, description, appUrl, feedbackRequested, platforms, videoUrl, initialPrompt, githubUrl } = body;

    if (!name || !description || !appUrl || !feedbackRequested) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const [updatedApp] = await db
      .update(apps)
      .set({
        name,
        logoUrl: logoUrl !== undefined ? logoUrl : existingApp.logoUrl,
        description,
        appUrl,
        feedbackRequested,
        platforms: Array.isArray(platforms) ? platforms.join(",") : platforms || "",
        videoUrl: videoUrl || null,
        initialPrompt: initialPrompt || null,
        githubUrl: githubUrl || null,
      })
      .where(eq(apps.id, appId))
      .returning();

    return NextResponse.json({ app: updatedApp });
  } catch (error) {
    console.error("Error updating app:", error);
    return NextResponse.json({ error: "Failed to update app" }, { status: 500 });
  }
}
