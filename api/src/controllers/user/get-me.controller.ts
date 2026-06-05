import type { RequestHandler } from "express";
import { db } from "../../database/index.js";

export const getMeController: RequestHandler = async (req, res) => {
  const { userId } = req;

  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
  });

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  });
};
