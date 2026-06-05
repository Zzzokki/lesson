import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { ideas } from "./index.js";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  ideas: many(ideas),
}));
