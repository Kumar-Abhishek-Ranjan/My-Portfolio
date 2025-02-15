import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendContactEmail } from "./email";
import { z } from "zod";
import { setupAuth } from "./auth";
import {
  insertProjectSchema,
  insertAchievementSchema,
  insertSkillSchema,
} from "@shared/schema";
import passport from 'passport'; // Assuming passport is used

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication and get middleware
  const { requireAuth, requireAdmin } = await setupAuth(app);

  // Authentication routes
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json(req.user);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(req.user);
  });

  // Contact form route
  app.post("/api/contact", async (req, res) => {
    try {
      const data = contactSchema.parse(req.body);
      const success = await sendContactEmail(data);

      if (success) {
        res.status(200).json({ message: "Message sent successfully" });
      } else {
        res.status(500).json({ message: "Failed to send message" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid form data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Server error" });
      }
    }
  });

  // Public routes for fetching content
  app.get("/api/projects", async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get("/api/achievements", async (_req, res) => {
    const achievements = await storage.getAchievements();
    res.json(achievements);
  });

  app.get("/api/skills", async (_req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  // Admin routes
  // Projects
  app.post("/api/admin/projects", requireAdmin, async (req, res) => {
    const data = insertProjectSchema.parse(req.body);
    const project = await storage.createProject(data);
    res.status(201).json(project);
  });

  app.patch("/api/admin/projects/:id", requireAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    const data = insertProjectSchema.partial().parse(req.body);
    const project = await storage.updateProject(id, data);
    res.json(project);
  });

  app.delete("/api/admin/projects/:id", requireAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    await storage.deleteProject(id);
    res.sendStatus(200);
  });

  // Achievements
  app.post("/api/admin/achievements", requireAdmin, async (req, res) => {
    const data = insertAchievementSchema.parse(req.body);
    const achievement = await storage.createAchievement(data);
    res.status(201).json(achievement);
  });

  app.patch("/api/admin/achievements/:id", requireAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    const data = insertAchievementSchema.partial().parse(req.body);
    const achievement = await storage.updateAchievement(id, data);
    res.json(achievement);
  });

  app.delete("/api/admin/achievements/:id", requireAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    await storage.deleteAchievement(id);
    res.sendStatus(200);
  });

  // Skills
  app.post("/api/admin/skills", requireAdmin, async (req, res) => {
    const data = insertSkillSchema.parse(req.body);
    const skill = await storage.createSkill(data);
    res.status(201).json(skill);
  });

  app.patch("/api/admin/skills/:id", requireAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    const data = insertSkillSchema.partial().parse(req.body);
    const skill = await storage.updateSkill(id, data);
    res.json(skill);
  });

  app.delete("/api/admin/skills/:id", requireAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    await storage.deleteSkill(id);
    res.sendStatus(200);
  });

  const httpServer = createServer(app);
  return httpServer;
}