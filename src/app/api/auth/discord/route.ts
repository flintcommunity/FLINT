import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const redirectUri = `${process.env.REPLIT_DEV_DOMAIN ? `https://${process.env.REPLIT_DEV_DOMAIN}` : 'http://localhost:5000'}/api/auth/discord/callback`;
  
  if (!clientId) {
    return NextResponse.json({ error: "Discord client ID not configured" }, { status: 500 });
  }

  const stateToken = request.nextUrl.searchParams.get("state");
  
  if (!stateToken) {
    return NextResponse.redirect(new URL("/signup?error=missing_state", request.url));
  }
  
  const scopes = ["identify", "email"];
  const authUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scopes.join("%20")}&state=${stateToken}`;
  
  return NextResponse.redirect(authUrl);
}
