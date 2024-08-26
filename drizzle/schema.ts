import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: text("id").primaryKey().notNull().unique(), // not uuid as we need to use the same id as clerk's userID
  email: text("email").notNull().unique(),
  stripeCustomerId: text("stripe_customer_id").unique(),
  stripeSubscriptionId: text("stripe_subscription_id").unique(),
  stripePriceId: text("stripe_price_id"),
  stripeCurrentPeriodEnd: timestamp("stripe_current_period_end"),
});

export const InsertUser = typeof userTable.$inferInsert;
export const SelectUser = typeof userTable.$inferSelect;
