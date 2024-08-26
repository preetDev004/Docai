ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "stripe_customer_id" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "stripe_subscription_id" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "stripe_price_id" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "stripe_current_period_end" timestamp;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "name";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_stripe_customer_id_unique" UNIQUE("stripe_customer_id");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_stripe_subscription_id_unique" UNIQUE("stripe_subscription_id");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_stripe_price_id_unique" UNIQUE("stripe_price_id");