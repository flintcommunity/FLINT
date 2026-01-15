import { pgTable, serial, text, varchar, timestamp, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  discordId: varchar("discord_id", { length: 255 }).notNull().unique(),
  discordUsername: varchar("discord_username", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const inviteTokens = pgTable("invite_tokens", {
  id: serial("id").primaryKey(),
  tokenHash: varchar("token_hash", { length: 255 }).notNull().unique(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  sessionToken: varchar("session_token", { length: 255 }).notNull().unique(),
  userId: serial("user_id").references(() => users.id).notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const pendingSignups = pgTable("pending_signups", {
  id: serial("id").primaryKey(),
  stateToken: varchar("state_token", { length: 255 }).notNull().unique(),
  inviteTokenId: serial("invite_token_id").references(() => inviteTokens.id).notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type InviteToken = typeof inviteTokens.$inferSelect;
export type Session = typeof sessions.$inferSelect;
