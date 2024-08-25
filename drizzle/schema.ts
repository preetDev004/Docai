import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
});

export const InsertUser = typeof userTable.$inferInsert
export const SelectUser = typeof userTable.$inferSelect
