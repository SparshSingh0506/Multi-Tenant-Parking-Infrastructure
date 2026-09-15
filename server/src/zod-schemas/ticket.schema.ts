import { z } from "zod";

export const ticketIdParamSchema = z.object({
  ticketId: z.uuid("Ticket ID must be a valid UUID")
});
export type TicketIdParamSchema = z.infer<typeof ticketIdParamSchema>;


export const initTicketSchema = z.object({
  vehiclePlate: z.string().min(1, "Vehicle Plate Id is required").max(20, "Vehicle Plate Id must be at most 20 characters"),
  vehicleCategoryId: z.uuid("Vehicle Category Id must be a valid UUID"),
  entryGateId: z.uuid("Entry Gate Id must be a valid UUID")
  //TODO: [later]  implement redis to cache the lots' categories and validate them as enum at the validation layer instead of just string validation*/
});
export type InitTicketSchema = z.infer<typeof initTicketSchema>;


export const closeTicketSchema = z.object({
  exitGateId: z.uuid("Exit Gate Id must be a valid UUID"),
  amountPaid: z.number().positive("Amount Paid must be a positive number")
});
export type CloseTicketSchema = z.infer<typeof closeTicketSchema>;
  