import type { RequestHandler } from "express";

import { db } from "../../database/index.js";
import { users } from "../../database/schema/user.schema.js";

export const signUpController: RequestHandler = async (req, res) => {
  try {
    const { body } = req;

    const { username, email, password } = body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const [user] = await db
      .insert(users)
      .values({ username, password, email })
      .returning();

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
