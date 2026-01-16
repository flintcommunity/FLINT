const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DISCORD_KINDLING_CHANNEL_ID = process.env.DISCORD_KINDLING_CHANNEL_ID;

interface AppSubmission {
  name: string;
  description: string;
  appUrl: string;
  feedbackRequested: string;
  creatorDiscordId: string;
  creatorDiscordUsername: string;
}

export async function postKindlingNotification(app: AppSubmission): Promise<boolean> {
  if (!DISCORD_BOT_TOKEN || !DISCORD_KINDLING_CHANNEL_ID) {
    console.error("Discord credentials not configured");
    return false;
  }

  const message = `**New app submitted to Kindling!**

**${app.name}** by <@${app.creatorDiscordId}>

${app.description}

**URL:** ${app.appUrl}

**Feedback requested:**
${app.feedbackRequested}`;

  try {
    const response = await fetch(
      `https://discord.com/api/v10/channels/${DISCORD_KINDLING_CHANNEL_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: message,
          allowed_mentions: {
            users: [app.creatorDiscordId],
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Discord API error:", response.status, errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to post to Discord:", error);
    return false;
  }
}
