import { RequestHandler } from "express";
import { ideas } from "../../database/schema/idea.schema.js";
import { db } from "../../database/index.js";
import { and, eq } from "drizzle-orm";

export const deleteIdeaController: RequestHandler = async (req, res) => {
  const { userId } = req;

  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const { id } = req.params;

  if (!id) return res.status(401).json({ message: "Missing required fields" });

  const idea = await db.query.ideas.findFirst({
    where: and(eq(ideas.id, Number(id)), eq(ideas.userId, userId)),
  });

  if (!idea) return res.status(400).json({ message: "Idea not found" });

  await db
    .delete(ideas)
    .where(and(eq(ideas.id, Number(id)), eq(ideas.userId, userId)));

  return res.status(200).json({ message: "Success" });
};
