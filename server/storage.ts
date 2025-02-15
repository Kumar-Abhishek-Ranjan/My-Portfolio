import { 
  users, type User, type InsertUser,
  projects, type Project, type InsertProject,
  achievements, type Achievement, type InsertAchievement,
  skills, type Skill, type InsertSkill
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Project operations
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: number): Promise<boolean>;

  // Achievement operations
  getAchievements(): Promise<Achievement[]>;
  getAchievement(id: number): Promise<Achievement | undefined>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
  updateAchievement(id: number, achievement: Partial<InsertAchievement>): Promise<Achievement>;
  deleteAchievement(id: number): Promise<boolean>;

  // Skill operations
  getSkills(): Promise<Skill[]>;
  getSkill(id: number): Promise<Skill | undefined>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill>;
  deleteSkill(id: number): Promise<boolean>;

  // Session store
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private achievements: Map<number, Achievement>;
  private skills: Map<number, Skill>;
  sessionStore: session.Store;
  currentId: { [key: string]: number };

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.achievements = new Map();
    this.skills = new Map();
    this.currentId = {
      users: 1,
      projects: 1,
      achievements: 1,
      skills: 1
    };
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // 24h
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId.users++;
    const user: User = { ...insertUser, id, isAdmin: false };
    this.users.set(id, user);
    return user;
  }

  // Project methods
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values())
      .sort((a, b) => a.order - b.order);
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentId.projects++;
    const project: Project = {
      ...insertProject,
      id,
      highlights: insertProject.highlights ?? null,
      order: insertProject.order ?? 0,
      createdAt: new Date()
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, projectUpdate: Partial<InsertProject>): Promise<Project> {
    const existing = await this.getProject(id);
    if (!existing) throw new Error("Project not found");

    const updated: Project = {
      ...existing,
      ...projectUpdate,
      id
    };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }

  // Achievement methods
  async getAchievements(): Promise<Achievement[]> {
    return Array.from(this.achievements.values())
      .sort((a, b) => a.order - b.order);
  }

  async getAchievement(id: number): Promise<Achievement | undefined> {
    return this.achievements.get(id);
  }

  async createAchievement(insertAchievement: InsertAchievement): Promise<Achievement> {
    const id = this.currentId.achievements++;
    const achievement: Achievement = {
      ...insertAchievement,
      id,
      order: insertAchievement.order ?? 0,
      createdAt: new Date()
    };
    this.achievements.set(id, achievement);
    return achievement;
  }

  async updateAchievement(id: number, achievementUpdate: Partial<InsertAchievement>): Promise<Achievement> {
    const existing = await this.getAchievement(id);
    if (!existing) throw new Error("Achievement not found");

    const updated: Achievement = {
      ...existing,
      ...achievementUpdate,
      id
    };
    this.achievements.set(id, updated);
    return updated;
  }

  async deleteAchievement(id: number): Promise<boolean> {
    return this.achievements.delete(id);
  }

  // Skill methods
  async getSkills(): Promise<Skill[]> {
    return Array.from(this.skills.values())
      .sort((a, b) => a.order - b.order);
  }

  async getSkill(id: number): Promise<Skill | undefined> {
    return this.skills.get(id);
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const id = this.currentId.skills++;
    const skill: Skill = {
      ...insertSkill,
      id,
      order: insertSkill.order ?? 0,
      createdAt: new Date()
    };
    this.skills.set(id, skill);
    return skill;
  }

  async updateSkill(id: number, skillUpdate: Partial<InsertSkill>): Promise<Skill> {
    const existing = await this.getSkill(id);
    if (!existing) throw new Error("Skill not found");

    const updated: Skill = {
      ...existing,
      ...skillUpdate,
      id
    };
    this.skills.set(id, updated);
    return updated;
  }

  async deleteSkill(id: number): Promise<boolean> {
    return this.skills.delete(id);
  }
}

export const storage = new MemStorage();