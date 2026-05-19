import type { RequestHandler } from "express";

import * as jose from "jose";
import { db } from "../../database/index.js";

export const signInController: RequestHandler = async (req, res) => {
  const { body } = req;

  const { email, password } = body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  if (user.password !== password) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const accessToken = await new jose.SignJWT({ userId: user.id })
    .setProtectedHeader({ alg: "HS256" })
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));

  res.json({
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    accessToken,
  });
};
