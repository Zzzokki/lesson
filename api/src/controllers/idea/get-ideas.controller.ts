import type { RequestHandler } from "express";
import { db } from "../../database/index.js";

export const getIdeasController: RequestHandler = async (_req, res) => {
  const ideas = await db.query.ideas.findMany({});

  res.status(200).json({ ideas });
};
