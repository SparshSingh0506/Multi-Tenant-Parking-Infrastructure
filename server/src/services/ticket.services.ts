import type { CloseTicket, InitTicket } from "@/interfaces/ticket.interfaces.js";
import { completeTicket, createTicket, getFinalTicket } from "@/repository/ticket.repo.js";


export const postInitTicketService = async (data: InitTicket) => {
  const ticket = await createTicket(data);

  if (!ticket) {
    throw new Error("Failed to create ticket");
  }

  return ticket.id;
};


export const patchCompleteTicketService = async (data: CloseTicket) => {
  await completeTicket(data);

  const ticket = await getFinalTicket(data.ticketId);

  return ticket;
};
