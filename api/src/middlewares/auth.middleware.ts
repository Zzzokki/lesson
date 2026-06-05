import type { RequestHandler } from "express";
import * as jose from "jose";

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const { payload } = await jose.jwtVerify<{ userId: number }>(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET),
    );

    const { userId } = payload;

    req.userId = userId;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
