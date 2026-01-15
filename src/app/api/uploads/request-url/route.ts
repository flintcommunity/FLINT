import { NextRequest, NextResponse } from "next/server";
import { db } from "@server/db";
import { sessions } from "@shared/schema";
import { eq, and, gt } from "drizzle-orm";
import { ObjectStorageService } from "@server/replit_integrations/object_storage";

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const sessionToken = request.cookies.get("session_token")?.value;
  
  if (!sessionToken) {
    return false;
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

  return !!session;
}

export async function POST(request: NextRequest) {
  const authenticated = await isAuthenticated(request);
  
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, size, contentType } = await request.json();

    if (!name) {
      return NextResponse.json({ error: "Missing required field: name" }, { status: 400 });
    }

    const objectStorageService = new ObjectStorageService();
    const uploadURL = await objectStorageService.getObjectEntityUploadURL();
    const objectPath = objectStorageService.normalizeObjectEntityPath(uploadURL);

    return NextResponse.json({
      uploadURL,
      objectPath,
      metadata: { name, size, contentType },
    });
  } catch (error) {
    console.error("Error generating upload URL:", error);
    return NextResponse.json({ error: "Failed to generate upload URL" }, { status: 500 });
  }
}
