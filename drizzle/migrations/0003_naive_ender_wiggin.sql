DO $$ BEGIN
 CREATE TYPE "public"."upload_status" AS ENUM('PENDING', 'PROCESSING', 'FAILED', 'SUCCESS');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"upload_status" "upload_status" DEFAULT 'PENDING',
	"url" text NOT NULL,
	"key" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "files_url_unique" UNIQUE("url"),
	CONSTRAINT "files_key_unique" UNIQUE("key")
);
