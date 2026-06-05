import type { RequestHandler } from "express";
import { db } from "../../database/index.js";
import { ideas } from "../../database/schema/index.js";

export const createIdeaController: RequestHandler = async (req, res) => {
  const { userId } = req;

  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const { body } = req;

  const { text } = body;

  if (!text) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const [idea] = await db.insert(ideas).values({ text, userId }).returning();

  res.status(201).json({ idea });
};
