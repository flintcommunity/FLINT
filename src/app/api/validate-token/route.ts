import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@server/db";
import { inviteTokens } from "@shared/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();
    
    if (!token) {
      return NextResponse.json({ valid: false, error: "Token is required" }, { status: 400 });
    }

    const allTokens = await db.select().from(inviteTokens).where(eq(inviteTokens.isActive, true));
    
    for (const storedToken of allTokens) {
      const isMatch = await bcrypt.compare(token, storedToken.tokenHash);
      if (isMatch) {
        return NextResponse.json({ valid: true });
      }
    }
    
    return NextResponse.json({ valid: false, error: "Invalid invite token" }, { status: 401 });
  } catch (error) {
    console.error("Token validation error:", error);
    return NextResponse.json({ valid: false, error: "Server error" }, { status: 500 });
  }
}
