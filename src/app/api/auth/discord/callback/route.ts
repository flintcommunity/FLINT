import { NextRequest, NextResponse } from "next/server";
import { db } from "@server/db";
import { users, sessions, pendingSignups } from "@shared/schema";
import { eq, and, gt } from "drizzle-orm";
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

export async function GET(request: NextRequest) {
  const baseUrl = getBaseUrl();
  const code = request.nextUrl.searchParams.get("code");
  const stateToken = request.nextUrl.searchParams.get("state");
  
  if (!code) {
    return NextResponse.redirect(`${baseUrl}/signup?error=no_code`);
  }

  if (!stateToken) {
    return NextResponse.redirect(`${baseUrl}/signup?error=invalid_state`);
  }

  const pendingSignup = await db
    .select()
    .from(pendingSignups)
    .where(
      and(
        eq(pendingSignups.stateToken, stateToken),
        gt(pendingSignups.expiresAt, new Date())
      )
    )
    .then((rows: typeof pendingSignups.$inferSelect[]) => rows[0]);

  if (!pendingSignup) {
    return NextResponse.redirect(`${baseUrl}/signup?error=invalid_state`);
  }

  await db.delete(pendingSignups).where(eq(pendingSignups.stateToken, stateToken));

  const clientId = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;
  const redirectUri = `${baseUrl}/api/auth/discord/callback`;

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(`${baseUrl}/signup?error=config_error`);
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
      return NextResponse.redirect(`${baseUrl}/signup?error=token_exchange_failed`);
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
      return NextResponse.redirect(`${baseUrl}/signup?error=user_fetch_failed`);
    }

    const discordUser = await userResponse.json();
    const { id: discordId, username: discordUsername, email } = discordUser;

    if (!email) {
      return NextResponse.redirect(`${baseUrl}/signup?error=no_email`);
    }

    let user = await db.select().from(users).where(eq(users.discordId, discordId)).then((rows: typeof users.$inferSelect[]) => rows[0]);

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

    const response = NextResponse.redirect(`${baseUrl}/members/field-guide`);
    response.cookies.set("session_token", sessionToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Discord OAuth error:", error);
    return NextResponse.redirect(`${baseUrl}/signup?error=oauth_error`);
  }
}
