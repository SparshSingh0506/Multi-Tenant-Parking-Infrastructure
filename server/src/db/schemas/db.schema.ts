import { decimal, uuid, timestamp, pgEnum, text, snakeCase, smallint, primaryKey } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";


const table = snakeCase.table;

export const parkingLot = table("parking_lot", {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
});

export const joinToken = table("join_token", {
  lotId: uuid().primaryKey().references((): any => parkingLot.id, { onDelete: "cascade" }),
  token: text().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").default(sql`NOW() + INTERVAL '7 DAYS'`).notNull() 
  
  // default expiration of 7 days but, TODO: user flexible to set it to any value
  //TODO: a db trigger to automatically delete expired tokens from the table
});

export const gateTypeEnum = pgEnum("gate_type", ["Entry", "Exit"]);

export const gate = table("gate", {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  type: gateTypeEnum().notNull(),
  lotId: uuid().notNull().references(() => parkingLot.id, { onDelete: "cascade" })
});

// export const vehicle = table("vehicle", {
//   id: text().primaryKey(), // using nameplate as the primary key
//   //categoryId: uuid().notNull().references(() => vehicleCategory.id, { onDelete: "cascade" }),
//   parkingLotId: uuid().notNull().references(() => parkingLot.id, { onDelete: "cascade" })
// });
// will probably add later

export const vehicleCategory = table("vehicle_category", {
  id: uuid().defaultRandom().primaryKey(),
  lotId: uuid().notNull().references(() => parkingLot.id, { onDelete: "cascade" }),
  category: text().notNull(),
  fare: decimal({ precision: 10, scale: 2 }).notNull(),
});

export const slotCategory = table("slot_category", {
  id: uuid().defaultRandom().primaryKey(),
  lotId: uuid().notNull().references(() => parkingLot.id, { onDelete: "cascade" }),
  category: text().notNull(),
  capacity: smallint().notNull(),
});

export const vehicleSlotCategory = table("vehicle_slot_category", {
  vehicleCategoryId: uuid().notNull().references(() => vehicleCategory.id, { onDelete: "cascade" }),
  slotCategoryId: uuid().notNull().references(() => slotCategory.id, { onDelete: "cascade" }),
}, (table) => [
  primaryKey({ columns: [table.vehicleCategoryId, table.slotCategoryId] })
]);

export const ticket = table("ticket", {
  id: uuid().defaultRandom().primaryKey(),
  lotId: uuid().notNull().references(() => parkingLot.id, { onDelete: "cascade" }),

  vehiclePlate: text().notNull(),
  vehicleCategoryId: uuid().notNull().references(() => vehicleCategory.id, { onDelete: "cascade" }),

  entryGateId: uuid().notNull().references(() => gate.id, { onDelete: "cascade" }),
  createdAt: timestamp().notNull().defaultNow(),

  exitGateId: uuid().references(() => gate.id, { onDelete: "cascade" }),
  closedAt: timestamp(),

  amountPaid: decimal({ precision: 10, scale: 2 }),
});
//TODO: reference the correct gate with composite foreign key (gateId + gateType) instead of just gateId. this will allow consistent validation of the gate type
//TODO: change non url primary keys from uuid to int to save space and improve performance