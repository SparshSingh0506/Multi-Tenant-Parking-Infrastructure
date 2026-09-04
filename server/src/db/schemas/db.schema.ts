import { decimal, uuid, timestamp, boolean, pgEnum, text, snakeCase, integer } from "drizzle-orm/pg-core";


const table = snakeCase.table;


export const parkingLot = table("parking_lot", {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
});


export const gateTypeEnum = pgEnum("gate_type", ["Entry", "Exit"]);

export const gate = table("gate", {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  type: gateTypeEnum().notNull(),
  parkingLotId: uuid().notNull().references(() => parkingLot.id, { onDelete: "cascade" })
});

export const vehicleCategory = table("vehicle_category", {
  id: uuid().defaultRandom().primaryKey(),
  parkingLotId: uuid().notNull().references(() => parkingLot.id, { onDelete: "cascade" }),
  category: text().notNull(),
  fare: decimal({ precision: 10, scale: 2 }).notNull(),
});

export const vehicleSlots = table("vehicle_slots", {
  id: uuid().defaultRandom().primaryKey(),
  parkingLotId: uuid().notNull().references(() => parkingLot.id, { onDelete: "cascade" }),
  name: text().notNull(), // deliberate choice to not link to vehicle category, as parking capacities can be defined independently
  capacity: integer().notNull(),
});

export const vehicle = table("vehicle", {
  id: uuid().defaultRandom().primaryKey(),
  plateId: text().notNull(),
});


export const ticket = table("ticket", {
  id: uuid().defaultRandom().primaryKey(),
  vehicleId: uuid().notNull().references(() => vehicle.id, { onDelete: "cascade" }),
  parkingLotId: uuid().notNull().references(() => parkingLot.id, { onDelete: "cascade" }),
  entryTime: timestamp().notNull(),
  entryGateId: uuid().notNull().references(() => gate.id, { onDelete: "cascade" }),
  exitTime: timestamp(),
  exitGateId: uuid().references(() => gate.id, { onDelete: "cascade" }),
  isClosed: boolean().notNull().default(false),
  amountPaid: decimal({ precision: 10, scale: 2 }),
});

