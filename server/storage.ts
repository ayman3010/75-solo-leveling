import { 
  type User, 
  type InsertUser,
  type UserSettings,
  type InsertUserSettings,
  type DayProgress,
  type InsertDayProgress,
  users,
  userSettings,
  dayProgress
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(username: string): Promise<User>;
  
  // User settings operations
  getUserSettings(username: string): Promise<UserSettings | undefined>;
  upsertUserSettings(username: string, settings: Partial<InsertUserSettings>): Promise<UserSettings>;
  
  // Day progress operations
  getDayProgress(username: string, dayNumber: number): Promise<DayProgress | undefined>;
  getAllDayProgress(username: string): Promise<DayProgress[]>;
  upsertDayProgress(username: string, dayNumber: number, progress: Partial<InsertDayProgress>): Promise<DayProgress>;
  resetAllProgress(username: string): Promise<void>;
}

export class DbStorage implements IStorage {
  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(username: string): Promise<User> {
    const result = await db.insert(users).values({ username }).returning();
    return result[0];
  }

  async getUserSettings(username: string): Promise<UserSettings | undefined> {
    const result = await db.select().from(userSettings).where(eq(userSettings.username, username)).limit(1);
    return result[0];
  }

  async upsertUserSettings(username: string, settings: Partial<InsertUserSettings>): Promise<UserSettings> {
    const existing = await this.getUserSettings(username);
    
    if (existing) {
      const result = await db
        .update(userSettings)
        .set(settings)
        .where(eq(userSettings.username, username))
        .returning();
      return result[0];
    } else {
      const result = await db
        .insert(userSettings)
        .values({ username, ...settings })
        .returning();
      return result[0];
    }
  }

  async getDayProgress(username: string, dayNumber: number): Promise<DayProgress | undefined> {
    const result = await db
      .select()
      .from(dayProgress)
      .where(and(eq(dayProgress.username, username), eq(dayProgress.dayNumber, dayNumber)))
      .limit(1);
    return result[0];
  }

  async getAllDayProgress(username: string): Promise<DayProgress[]> {
    return await db.select().from(dayProgress).where(eq(dayProgress.username, username));
  }

  async upsertDayProgress(username: string, dayNumber: number, progress: Partial<InsertDayProgress>): Promise<DayProgress> {
    const existing = await this.getDayProgress(username, dayNumber);
    
    if (existing) {
      const result = await db
        .update(dayProgress)
        .set(progress)
        .where(and(eq(dayProgress.username, username), eq(dayProgress.dayNumber, dayNumber)))
        .returning();
      return result[0];
    } else {
      const result = await db
        .insert(dayProgress)
        .values({ username, dayNumber, ...progress })
        .returning();
      return result[0];
    }
  }

  async resetAllProgress(username: string): Promise<void> {
    await db.delete(dayProgress).where(eq(dayProgress.username, username));
  }
}

export const storage = new DbStorage();
