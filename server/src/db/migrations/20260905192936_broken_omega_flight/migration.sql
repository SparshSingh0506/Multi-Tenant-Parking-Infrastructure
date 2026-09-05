CREATE TABLE "vehicle_slots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"parking_lot_id" uuid NOT NULL,
	"name" text NOT NULL,
	"capacity" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ticket" DROP CONSTRAINT "ticket_vehicle_id_vehicle_category_id_fkey";--> statement-breakpoint
DROP TABLE "vehicle";--> statement-breakpoint
ALTER TABLE "ticket" RENAME COLUMN "vehicle_id" TO "vehicle_plate_id";--> statement-breakpoint
ALTER TABLE "ticket" RENAME COLUMN "is_active" TO "is_closed";--> statement-breakpoint
ALTER TABLE "ticket" ADD COLUMN "vehicle_category_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "gate" DROP COLUMN "allowed_movements";--> statement-breakpoint
ALTER TABLE "parking_lot" DROP COLUMN "gate";--> statement-breakpoint
ALTER TABLE "ticket" ALTER COLUMN "vehicle_plate_id" SET DATA TYPE text USING "vehicle_plate_id"::text;--> statement-breakpoint
ALTER TABLE "ticket" ALTER COLUMN "is_closed" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_vehicle_category_id_vehicle_category_id_fkey" FOREIGN KEY ("vehicle_category_id") REFERENCES "vehicle_category"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_entry_gate_id_gate_id_fkey" FOREIGN KEY ("entry_gate_id") REFERENCES "gate"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_exit_gate_id_gate_id_fkey" FOREIGN KEY ("exit_gate_id") REFERENCES "gate"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "vehicle_slots" ADD CONSTRAINT "vehicle_slots_parking_lot_id_parking_lot_id_fkey" FOREIGN KEY ("parking_lot_id") REFERENCES "parking_lot"("id") ON DELETE CASCADE;