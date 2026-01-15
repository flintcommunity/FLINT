import { NextRequest, NextResponse } from "next/server";
import { db } from "@server/db";
import { users, sessions } from "@shared/schema";
import { eq } from "drizzle-orm";
import { randomBytes } from "crypto";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  
  if (!code) {
    return NextResponse.redirect(new URL("/signup?error=no_code", request.url));
  }

  const clientId = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;
  const redirectUri = `${process.env.REPLIT_DEV_DOMAIN ? `https://${process.env.REPLIT_DEV_DOMAIN}` : 'http://localhost:5000'}/api/auth/discord/callback`;

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(new URL("/signup?error=config_error", request.url));
  }

  try {
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      console.error("Token exchange failed:", await tokenResponse.text());
      return NextResponse.redirect(new URL("/signup?error=token_exchange_failed", request.url));
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.ok) {
      console.error("User fetch failed:", await userResponse.text());
      return NextResponse.redirect(new URL("/signup?error=user_fetch_failed", request.url));
    }

    const discordUser = await userResponse.json();
    const { id: discordId, username: discordUsername, email } = discordUser;

    if (!email) {
      return NextResponse.redirect(new URL("/signup?error=no_email", request.url));
    }

    let user = await db.select().from(users).where(eq(users.discordId, discordId)).then(rows => rows[0]);

    if (!user) {
      const [newUser] = await db.insert(users).values({
        email,
        discordId,
        discordUsername,
      }).returning();
      user = newUser;
    }

    const sessionToken = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await db.insert(sessions).values({
      sessionToken,
      userId: user.id,
      expiresAt,
    });

    const response = NextResponse.redirect(new URL("/dashboard", request.url));
    response.cookies.set("session_token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Discord OAuth error:", error);
    return NextResponse.redirect(new URL("/signup?error=oauth_error", request.url));
  }
}
