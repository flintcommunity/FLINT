import { NextRequest, NextResponse } from "next/server";
import { db } from "@server/db";
import { apps } from "@shared/schema";
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
        platforms: apps.platforms,
      })
      .from(apps)
      .where(eq(apps.isFirewood, true))
      .orderBy(desc(apps.createdAt));

    return NextResponse.json({ apps: firewoodApps });
  } catch (error) {
    console.error("Error fetching firewood apps:", error);
    return NextResponse.json({ error: "Failed to fetch apps" }, { status: 500 });
  }
}
