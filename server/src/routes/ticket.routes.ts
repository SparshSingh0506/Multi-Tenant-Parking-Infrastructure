import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { closeTicketSchema, ticketIdParamSchema } from "@/zod-schemas/ticket.schema.js";
import { patchCompleteTicketController } from "@/controllers/ticket.controllers.js";

const router = new Hono();

router.patch('/:ticketId/close', zValidator('param', ticketIdParamSchema), zValidator('json', closeTicketSchema), patchCompleteTicketController);

export default router;