import bcrypt from "bcryptjs";
import { db } from "../server/db";
import { inviteTokens } from "../shared/schema";

async function seedToken() {
  const token = "SPARKSOMETHING";
  const tokenHash = await bcrypt.hash(token, 10);
  
  try {
    await db.insert(inviteTokens).values({
      tokenHash,
      isActive: true,
    });
    console.log("Invite token seeded successfully");
  } catch (error) {
    console.log("Token may already exist:", error);
  }
  
  process.exit(0);
}

seedToken();
