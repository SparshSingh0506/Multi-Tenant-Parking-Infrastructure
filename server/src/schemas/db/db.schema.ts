import { decimal, pgTable, uuid, varchar, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";

export const parkingLotTable = pgTable("parking_lots", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  gate: varchar({ length: 255 }).notNull(),
});

export const adminTable = pgTable("admins", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const operatorTable = pgTable("operators", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  admin_id: uuid().notNull().references(() => adminTable.id, { onDelete: "cascade" })
});


const gateTypeEnum = pgEnum("gate_type", ["Entry", "Exit"]);

export const gateTable = pgTable("gates", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  type: gateTypeEnum().notNull(),
  allowed_movements: varchar({ length: 255 }).notNull(),
  parkingLot_id: uuid().notNull().references(() => parkingLotTable.id, { onDelete: "cascade" })
});

export const vehicleTable = pgTable("vehicles", {
  id: uuid().defaultRandom().primaryKey(),
  type: varchar({ length: 255 }).notNull(),
});

export const parkingSessionTable = pgTable("parking_sessions", {
  id: uuid().defaultRandom().primaryKey(),
  vehicle_id: uuid().notNull().references(() => vehicleTable.id, { onDelete: "cascade" }),
  parkingLot_id: uuid().notNull().references(() => parkingLotTable.id, { onDelete: "cascade" }),
  entryTime: timestamp().notNull(),
  entryGate_id: uuid().notNull(),
  exitTime: timestamp(),
  exitGate_id: uuid(),
  isActive: boolean().notNull().default(true),
  amountPaid: decimal({ precision: 10, scale: 2 }),
});
