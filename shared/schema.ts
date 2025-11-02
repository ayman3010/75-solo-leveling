import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, jsonb, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  username: varchar("username", { length: 20 }).primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userSettings = pgTable("user_settings", {
  username: varchar("username", { length: 20 }).primaryKey().references(() => users.username, { onDelete: "cascade" }),
  actualDay: integer("actual_day").notNull().default(1),
  selectedDay: integer("selected_day").notNull().default(1),
  lastCheck: varchar("last_check"),
  customHabits: jsonb("custom_habits"),
});

export const dayProgress = pgTable("day_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: varchar("username", { length: 20 }).notNull().references(() => users.username, { onDelete: "cascade" }),
  dayNumber: integer("day_number").notNull(),
  workout1: boolean("workout1").notNull().default(false),
  workout2: boolean("workout2").notNull().default(false),
  diet: boolean("diet").notNull().default(false),
  water: boolean("water").notNull().default(false),
  reading: boolean("reading").notNull().default(false),
  sleep: boolean("sleep").notNull().default(false),
  photo: boolean("photo").notNull().default(false),
  reflection: text("reflection").notNull().default(""),
}, (table) => ({
  userDayUnique: unique().on(table.username, table.dayNumber),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
});

export const insertUserSettingsSchema = createInsertSchema(userSettings).omit({
  username: true,
});

export const insertDayProgressSchema = createInsertSchema(dayProgress).omit({
  id: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertUserSettings = z.infer<typeof insertUserSettingsSchema>;
export type UserSettings = typeof userSettings.$inferSelect;

export type InsertDayProgress = z.infer<typeof insertDayProgressSchema>;
export type DayProgress = typeof dayProgress.$inferSelect;
