import { NextRequest, NextResponse } from "next/server";

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
  const clientId = process.env.DISCORD_CLIENT_ID;
  const redirectUri = `${baseUrl}/api/auth/discord/callback`;
  
  if (!clientId) {
    return NextResponse.json({ error: "Discord client ID not configured" }, { status: 500 });
  }

  const stateToken = request.nextUrl.searchParams.get("state");
  
  if (!stateToken) {
    return NextResponse.redirect(`${baseUrl}/signup?error=missing_state`);
  }
  
  const scopes = ["identify", "email"];
  const authUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scopes.join("%20")}&state=${stateToken}`;
  
  return NextResponse.redirect(authUrl);
}
