ALTER TABLE "gate" RENAME COLUMN "parking_lot_id" TO "lot_id";--> statement-breakpoint
ALTER TABLE "vehicle_slots" RENAME COLUMN "parking_lot_id" TO "lot_id";--> statement-breakpoint
ALTER TABLE "ticket" RENAME COLUMN "parking_lot_id" TO "lot_id";--> statement-breakpoint
ALTER TABLE "ticket" RENAME COLUMN "vehicle_plate_id" TO "vehicle_plate";--> statement-breakpoint
ALTER TABLE "vehicle_category" RENAME COLUMN "parking_lot_id" TO "lot_id";--> statement-breakpoint
ALTER TABLE "vehicle_category" RENAME COLUMN "category" TO "name";--> statement-breakpoint
ALTER TABLE "ticket" ALTER COLUMN "entry_time" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "vehicle_slots" ALTER COLUMN "capacity" SET DATA TYPE smallint USING "capacity"::smallint;