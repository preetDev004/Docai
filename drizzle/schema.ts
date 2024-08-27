import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

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
  uploadStatus: UploadEnum("upload_status").default("PENDING"),
  userId: text("user_id")
    .references(() => userTable.id, { onDelete: "cascade" })
    .notNull(),
  url: text("url").notNull().unique(),
  key: text("key").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const fileRelations = relations(fileTable, ({ one }) => ({
  user: one(userTable, {
    fields: [fileTable.userId],
    references: [userTable.id],
  }),
}));

export const schema = {
  userTable,
  fileTable,
  userRelations,
  fileRelations,
};