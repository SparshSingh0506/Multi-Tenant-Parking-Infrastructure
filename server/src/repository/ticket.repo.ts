import { db } from "@/configs/db.config.js";
import { eq } from "drizzle-orm";
import { ticket } from "@/db/schemas/db.schema.js";
import type { CloseTicket, InitTicket } from "@/interfaces/ticket.interfaces.js"; // InitTicketSchema (req body) + lotId (param) = InitTicket
// TODO: make these zod schemas instead of an interface


export const createTicket = async (data: InitTicket) => {
  const { lotId, vehiclePlate, vehicleCategoryId, entryGateId } = data;

  const result = await db.transaction(async (tx) => {

    // TODO: implement live slot capacity check 

    const slotCapacity = {}; // only generate ticket if the lot has available capacity for the vehicle category

    if (slotCapacity === 0) throw new Error("No available slots for the selected vehicle category");

    const ticketResult = await tx.insert(ticket).values({
      lotId,
      vehiclePlate,
      vehicleCategoryId,
      entryGateId,
    }).returning();

    return ticketResult[0];
  });

  return result;
}


export const completeTicket = async (data: CloseTicket) => {
  const { ticketId, exitGateId, amountPaid } = data;

  const result = await db
    .update(ticket).set({
      exitGateId,
      closedAt: new Date(),
      amountPaid: amountPaid.toFixed(2),
    })
    .where(eq(ticket.id, ticketId)).returning();

  return result[0];
}

// TODO: send actual ticket data instead of the id's of the lot, vehicle category, and gate. 

export const getFinalTicket = async (ticketId: string) => {

}