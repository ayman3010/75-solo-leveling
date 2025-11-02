import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Login/create user
  app.post("/api/auth/login", async (req, res) => {
    try {
      const schema = z.object({
        username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_-]+$/),
      });
      
      const { username } = schema.parse(req.body);
      
      let user = await storage.getUserByUsername(username);
      if (!user) {
        user = await storage.createUser(username);
      }
      
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: "Invalid username" });
    }
  });

  // Get user settings
  app.get("/api/user/:username/settings", async (req, res) => {
    try {
      const { username } = req.params;
      let settings = await storage.getUserSettings(username);
      
      if (!settings) {
        settings = await storage.upsertUserSettings(username, {
          actualDay: 1,
          selectedDay: 1,
        });
      }
      
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch settings" });
    }
  });

  // Update user settings
  app.post("/api/user/:username/settings", async (req, res) => {
    try {
      const { username } = req.params;
      const schema = z.object({
        actualDay: z.number().min(1).max(75).optional(),
        selectedDay: z.number().min(1).max(75).optional(),
        lastCheck: z.string().optional(),
        customHabits: z.object({
          workout1: z.string(),
          workout2: z.string(),
          diet: z.string(),
          water: z.string(),
          reading: z.string(),
          sleep: z.string(),
          photo: z.string(),
        }).optional(),
      });
      
      const validatedData = schema.parse(req.body);
      const settings = await storage.upsertUserSettings(username, validatedData);
      res.json(settings);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid request data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update settings" });
      }
    }
  });

  // Get all day progress for a user
  app.get("/api/user/:username/progress", async (req, res) => {
    try {
      const { username } = req.params;
      const progress = await storage.getAllDayProgress(username);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch progress" });
    }
  });

  // Get specific day progress
  app.get("/api/user/:username/progress/:day", async (req, res) => {
    try {
      const { username, day } = req.params;
      const dayNumber = parseInt(day, 10);
      
      let progress = await storage.getDayProgress(username, dayNumber);
      
      if (!progress) {
        progress = await storage.upsertDayProgress(username, dayNumber, {});
      }
      
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch day progress" });
    }
  });

  // Update specific day progress
  app.post("/api/user/:username/progress/:day", async (req, res) => {
    try {
      const { username, day } = req.params;
      const dayNumber = parseInt(day, 10);
      
      if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 75) {
        res.status(400).json({ error: "Invalid day number" });
        return;
      }
      
      const schema = z.object({
        workout1: z.boolean().optional(),
        workout2: z.boolean().optional(),
        diet: z.boolean().optional(),
        water: z.boolean().optional(),
        reading: z.boolean().optional(),
        sleep: z.boolean().optional(),
        photo: z.boolean().optional(),
        reflection: z.string().optional(),
      });
      
      const validatedData = schema.parse(req.body);
      const progress = await storage.upsertDayProgress(username, dayNumber, validatedData);
      res.json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid request data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update progress" });
      }
    }
  });

  // Reset all progress
  app.post("/api/user/:username/reset", async (req, res) => {
    try {
      const { username } = req.params;
      await storage.resetAllProgress(username);
      await storage.upsertUserSettings(username, {
        actualDay: 1,
        selectedDay: 1,
      });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to reset progress" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
