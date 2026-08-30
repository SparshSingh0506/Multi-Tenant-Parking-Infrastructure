import { decimal, pgTable, uuid, timestamp, boolean, pgEnum, text } from "drizzle-orm/pg-core";


export const parkingLot = pgTable("parking_lot", {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  gate: text().notNull(),
});

// export const userTable = pgTable("users", {
//   id: uuid().defaultRandom().primaryKey(),
//   name: text().notNull(),
//   email: text().notNull().unique(),
//   hashed_password: text().notNull(),
//   manager_id: uuid() 
// });


export const gateTypeEnum = pgEnum("gate_type", ["Entry", "Exit"]);

export const gate = pgTable("gate", {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  type: gateTypeEnum().notNull(),
  allowed_movements: text().notNull(),
  parkingLot_id: uuid().notNull().references(() => parkingLot.id, { onDelete: "cascade" })
});


export const vehicle = pgTable("vehicle", {
  id: uuid().defaultRandom().primaryKey(),
  type: text().notNull(),
});


export const parkingSession = pgTable("parking_session", {
  id: uuid().defaultRandom().primaryKey(),
  vehicle_id: uuid().notNull().references(() => vehicle.id, { onDelete: "cascade" }),
  parkingLot_id: uuid().notNull().references(() => parkingLot.id, { onDelete: "cascade" }),
  entryTime: timestamp().notNull(),
  entryGate_id: uuid().notNull(),
  exitTime: timestamp(),
  exitGate_id: uuid(),
  isActive: boolean().notNull().default(true),
  amountPaid: decimal({ precision: 10, scale: 2 }),
});

