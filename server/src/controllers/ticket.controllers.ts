import type { Context } from "hono";
import type { CloseTicketSchema, InitTicketSchema } from "@/zod-schemas/ticket.schema.js";
import type { CloseTicket, InitTicket } from "@/interfaces/ticket.interfaces.js";
import { patchCompleteTicketService, postInitTicketService } from "@/services/ticket.services.js";


export const postInitTicketController = async (c: Context) => {
  const body = await c.req.json() as InitTicketSchema;
  const lotId = c.req.param('lotId') as string;

  const data: InitTicket = {
    lotId,
    ...body
  };

  const initTicket = await postInitTicketService(data);

  return c.json({ data: initTicket }, 201);
}


export const patchCompleteTicketController = async (c: Context) => { 
  const body = await c.req.json() as CloseTicketSchema;
  const ticketId = c.req.param('ticketId') as string;

  const data: CloseTicket = {
    ticketId,
    ...body
  };

  const finalTicket = await patchCompleteTicketService(data);

  return c.json({ data: "test ok"}, 200);
}