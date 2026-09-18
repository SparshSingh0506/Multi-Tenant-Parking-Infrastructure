CREATE TYPE "user_type" AS ENUM('Manager', 'Operator');--> statement-breakpoint
CREATE TYPE "gate_type" AS ENUM('Entry', 'Exit');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"issuer" text
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL UNIQUE,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"email" text NOT NULL UNIQUE,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"role" "user_type",
	"lot_id" uuid,
	"joined_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gate" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"type" "gate_type" NOT NULL,
	"lot_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "join_token" (
	"lot_id" uuid PRIMARY KEY,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp DEFAULT NOW() + INTERVAL '7 DAYS' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "parking_lot" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "slots_category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"lot_id" uuid NOT NULL,
	"name" text NOT NULL,
	"capacity" smallint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ticket" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"lot_id" uuid NOT NULL,
	"vehicle_plate" text NOT NULL,
	"vehicle_category_id" uuid NOT NULL,
	"entry_gate_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"exit_gate_id" uuid,
	"closed_at" timestamp,
	"amount_paid" numeric(10,2)
);
--> statement-breakpoint
CREATE TABLE "vehicle_category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"lot_id" uuid NOT NULL,
	"name" text NOT NULL,
	"fare" numeric(10,2) NOT NULL
);
--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "account" ("user_id");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "session" ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" ("identifier");--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_lot_id_parking_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "parking_lot"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "gate" ADD CONSTRAINT "gate_lot_id_parking_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "parking_lot"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "join_token" ADD CONSTRAINT "join_token_lot_id_parking_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "parking_lot"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "slots_category" ADD CONSTRAINT "slots_category_lot_id_parking_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "parking_lot"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_lot_id_parking_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "parking_lot"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_vehicle_category_id_vehicle_category_id_fkey" FOREIGN KEY ("vehicle_category_id") REFERENCES "vehicle_category"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_entry_gate_id_gate_id_fkey" FOREIGN KEY ("entry_gate_id") REFERENCES "gate"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_exit_gate_id_gate_id_fkey" FOREIGN KEY ("exit_gate_id") REFERENCES "gate"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "vehicle_category" ADD CONSTRAINT "vehicle_category_lot_id_parking_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "parking_lot"("id") ON DELETE CASCADE;