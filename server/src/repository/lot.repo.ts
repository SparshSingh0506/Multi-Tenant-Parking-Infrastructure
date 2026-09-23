import { db } from "@/configs/db.config.js";
import { and, eq, lt } from "drizzle-orm";
import type { CreateLotSchema } from "@/zod-schemas/lot.schema.js";
import { gate, parkingLot, vehicleCategory, slotsCategory as db_slotsCategories, user, joinToken } from "@/db/schemas/index.schema.js";


export const createInitLotData = async (data: CreateLotSchema) => {
  const { name, gates, vehicleCategories, slotsCategories } = data;

  const result = await db.transaction(async (tx) => {
    const [{ id }] = await tx.insert(parkingLot).values({
      name
    }).returning();

    const gateResults = await tx.insert(gate).values(gates.map(gate => ({
      name: gate.name,
      type: gate.type,
      lotId: id
    }))).returning();

    const categoryResults = await tx.insert(vehicleCategory).values(vehicleCategories.map(category => ({
      name: category.name,
      fare: category.fare.toFixed(2),
      lotId: id
    }))).returning();

    const slotsCategoriesResults = await tx.insert(db_slotsCategories).values(slotsCategories.map(slot => ({
      name: slot.name,
      capacity: slot.capacity,
      lotId: id
    }))).returning();

    return {
      id,
      name,
      gates: gateResults,
      vehicleCategories: categoryResults,
      slotsCategories: slotsCategoriesResults,
    };
  });

  return result;
}


export const getStaticLotDetails = async (lotId: string) => {
  const lotResult = await db
    .select({
      id: parkingLot.id,
      name: parkingLot.name,
    })
    .from(parkingLot).where(eq(parkingLot.id, lotId));

  const gates = await db
    .select({
      id: gate.id,
      name: gate.name,
      type: gate.type
    })
    .from(gate).where(eq(gate.lotId, lotId));

  const vehicleCategories = await db
    .select({
      id: vehicleCategory.id,
      name: vehicleCategory.name,
      fare: vehicleCategory.fare
    })
    .from(vehicleCategory).where(eq(vehicleCategory.lotId, lotId));

  const slotsCategories = await db
    .select({
      id: db_slotsCategories.id,
      name: db_slotsCategories.name,
      capacity: db_slotsCategories.capacity
    })
    .from(db_slotsCategories).where(eq(db_slotsCategories.lotId, lotId));

  return {
    id: lotResult[0].id,
    name: lotResult[0].name,
    gates,
    vehicleCategories,
    slotsCategories
  };
}


export const getLotIdFromJoinToken = async (token: string) => {
  const result = await db
  .select({
    lotId: joinToken.lotId,
  })
  .from(joinToken)
  .where(eq(joinToken.token, token));

  return result[0]?.lotId ?? null;
}


export const getJoinTokenFromLotId = async (lotId: string) => {
  const result = await db
    .select({
      token: joinToken.token,
    })
    .from(joinToken)
    .where(eq(joinToken.lotId, lotId));


  return result[0]?.token ?? null;
}


export const validateJoinToken = async (token: string) => {
  const result = await db
    .select({ token: joinToken.token })
    .from(joinToken)
    .where(and(eq(joinToken.token, token), lt(joinToken.expiresAt, new Date())))
    .limit(1);

  return result.length > 0;
}


export const mapJoinTokenToLot = async (lotId: string, token: string) => {
  await db.insert(joinToken).values({
    lotId,
    token
  });
}


export const getLotOperators = async (lotId: string) => {
  const result = await db.select({
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    joinedAt: user.joinedAt,
  }).from(user).where(eq(user.lotId, lotId));

  return result;
}
