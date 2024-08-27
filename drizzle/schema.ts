import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { db } from "./db";

export const userTable = pgTable("users", {
  id: text("id").primaryKey().notNull().unique(), // not uuid as we need to use the same id as clerk's userID
  email: text("email").notNull().unique(),
  stripeCustomerId: text("stripe_customer_id").unique(),
  stripeSubscriptionId: text("stripe_subscription_id").unique(),
  stripePriceId: text("stripe_price_id"),
  stripeCurrentPeriodEnd: timestamp("stripe_current_period_end"),
});

export const userRelations = relations(userTable, ({ many }) => ({
  files: many(fileTable),
}));

export const InsertUser = typeof userTable.$inferInsert;
export const SelectUser = typeof userTable.$inferSelect;

export const UploadEnum = pgEnum("upload_status", [
  "PENDING",
  "PROCESSING",
  "FAILED",
  "SUCCESS",
]);
export const fileTable = pgTable("files", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  user: text("user")
    .references(() => userTable.id)
    .notNull(),

  uploadStatus: UploadEnum("upload_status").default("PENDING"),
  url: text("url"),
  key: text("key"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const fileRelations = relations(fileTable, ({ one }) => ({
  user: one(userTable, {
    fields: [fileTable.id],
    references: [userTable.id],
  }),
}));

export const schema = {
  userTable,
  fileTable,
  userRelations,
  fileRelations,
};
