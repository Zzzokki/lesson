import { config } from "dotenv";
import express from "express";
import { db } from "./database/index.js";
import { users } from "./database/schema/index.js";

config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.post("/users", async (req, res) => {
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
});

app.get("/users", async (_req, res) => {
  const allUsers = await db.query.users.findMany();
  res.json(allUsers);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
