import { decimal, uuid, timestamp, boolean, pgEnum, text, snakeCase } from "drizzle-orm/pg-core";


const table = snakeCase.table;


export const parkingLot = table("parking_lot", {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  gate: text().notNull(),
});


export const gateTypeEnum = pgEnum("gate_type", ["Entry", "Exit"]);

export const gate = table("gate", {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  type: gateTypeEnum().notNull(),
  allowedMovements: text().notNull(),
  parkingLotId: uuid().notNull().references(() => parkingLot.id, { onDelete: "cascade" })
});


export const vehicleCategory = table("vehicle_category", {
  id: uuid().defaultRandom().primaryKey(),
  parkingLotId: uuid().notNull().references(() => parkingLot.id, { onDelete: "cascade" }),
  category: text().notNull(),
  fare: decimal({ precision: 10, scale: 2 }).notNull(),
});


export const vehicle = table("vehicle", {
  id: uuid().defaultRandom().primaryKey(),
  categoryId: uuid().notNull().references(() => vehicleCategory.id, { onDelete: "cascade" }),
  plateId: text().notNull(),
});


export const ticket = table("ticket", {
  id: uuid().defaultRandom().primaryKey(),
  vehicleId: uuid().notNull().references(() => vehicleCategory.id, { onDelete: "cascade" }),
  parkingLotId: uuid().notNull().references(() => parkingLot.id, { onDelete: "cascade" }),
  entryTime: timestamp().notNull(),
  entryGateId: uuid().notNull(),
  exitTime: timestamp(),
  exitGateId: uuid(),
  isActive: boolean().notNull().default(true),
  amountPaid: decimal({ precision: 10, scale: 2 }),
});

