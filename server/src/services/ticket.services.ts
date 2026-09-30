import type { CloseTicket, InitTicket } from "@/interfaces/ticket.interfaces.js";
import { completeTicket, createTicket, getFinalTicket } from "@/repository/ticket.repo.js";


export const postInitTicketService = async (data: InitTicket) => { // on entry
  const ticket = await createTicket(data);

  return ticket.id;
};


export const patchCompleteTicketService = async (data: CloseTicket) => { // on exit
  await completeTicket(data);

  const ticket = await getFinalTicket(data.ticketId);

  return ticket;
};
