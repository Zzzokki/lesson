import { relations } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { users } from "./index.js";

export const ideas = pgTable("ideas", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  userId: serial("user_id").notNull(),
});

export const ideaRelations = relations(ideas, ({ one }) => ({
  user: one(users, {
    fields: [ideas.userId],
    references: [users.id],
  }),
}));
