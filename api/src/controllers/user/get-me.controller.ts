import type { RequestHandler } from "express";
import * as jose from "jose";
import { db } from "../../database/index.js";

export const getMeController: RequestHandler = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { payload } = await jose.jwtVerify<{ userId: number }>(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET),
    );

    const { userId } = payload;

    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, userId),
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
