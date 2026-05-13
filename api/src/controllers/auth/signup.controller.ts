import type { RequestHandler } from "express";

import { db } from "../../database/index.js";
import { users } from "../../database/schema/user.schema.js";

export const signUpController: RequestHandler = async (req, res) => {
  const { body } = req;

  const { username, email, password } = body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const user = await db
    .insert(users)
    .values({ username, password, email })
    .returning();

  res.json(user);
};
