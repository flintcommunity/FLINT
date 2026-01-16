import { NextRequest, NextResponse } from "next/server";
import { db } from "@server/db";
import { users, sessions } from "@shared/schema";
import { eq } from "drizzle-orm";
import { randomBytes } from "crypto";

function getBaseUrl() {
  if (process.env.PRODUCTION_URL) {
    return process.env.PRODUCTION_URL;
  }
  if (process.env.REPLIT_DEV_DOMAIN) {
    return `https://${process.env.REPLIT_DEV_DOMAIN}`;
  }
  return "http://localhost:5000";
}

function getCookieDomain(): string | undefined {
  if (process.env.PRODUCTION_URL) {
    try {
      const url = new URL(process.env.PRODUCTION_URL);
      return url.hostname;
    } catch {
      return undefined;
    }
  }
  return undefined;
}

export async function GET(request: NextRequest) {
  const baseUrl = getBaseUrl();
  const code = request.nextUrl.searchParams.get("code");
  
  if (!code) {
    return NextResponse.redirect(`${baseUrl}/login?error=no_code`);
  }

  const clientId = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;
  const redirectUri = `${baseUrl}/api/auth/discord/login/callback`;

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(`${baseUrl}/login?error=config_error`);
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
      return NextResponse.redirect(`${baseUrl}/login?error=oauth_error`);
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
      return NextResponse.redirect(`${baseUrl}/login?error=oauth_error`);
    }

    const discordUser = await userResponse.json();
    const { id: discordId } = discordUser;

    const user = await db.select().from(users).where(eq(users.discordId, discordId)).then((rows: typeof users.$inferSelect[]) => rows[0]);

    if (!user) {
      return NextResponse.redirect(`${baseUrl}/login?error=no_account`);
    }

    const sessionToken = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

    await db.insert(sessions).values({
      sessionToken,
      userId: user.id,
      expiresAt,
    });

    const response = NextResponse.redirect(`${baseUrl}/members/field-guide`);
    const cookieDomain = getCookieDomain();
    response.cookies.set("session_token", sessionToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 90 * 24 * 60 * 60,
      path: "/",
      ...(cookieDomain && { domain: cookieDomain }),
    });

    return response;
  } catch (error) {
    console.error("Discord OAuth error:", error);
    return NextResponse.redirect(`${baseUrl}/login?error=oauth_error`);
  }
}
