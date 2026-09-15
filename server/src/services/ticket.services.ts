import type { CloseTicket, InitTicket } from "@/interfaces/ticket.interfaces.js";
import { completeTicket, createTicket, getFinalTicket } from "@/repository/ticket.repo.js";


export const postInitTicketService = async (data: InitTicket) => {
  try {
    const ticket = await createTicket(data);

    return ticket.id;
  }

  catch (error) {
    throw error;
  }
}


export const patchCompleteTicketService = async (data: CloseTicket) => {
  try {
    await completeTicket(data);

    const ticket = await getFinalTicket(data.ticketId);

    return ticket;
  }

  catch (error) {
    throw error;
  }
}
