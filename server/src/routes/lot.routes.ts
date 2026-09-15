import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { lotIdParamSchema, initLotDataSchema } from "@/zod-schemas/lot.schema.js";
import { initTicketSchema } from "@/zod-schemas/ticket.schema.js";

import { getStaticLotDataController, postInitLotDataController} from "@/controllers/lot.controllers.js";
import { postInitTicketController } from "@/controllers/ticket.controllers.js";


const router = new Hono();

router.post('/', zValidator('json', initLotDataSchema), postInitLotDataController);
router.get('/:lotId', zValidator('param', lotIdParamSchema), getStaticLotDataController);
router.post('/:lotId/tickets', zValidator('json', initTicketSchema), postInitTicketController);
// TODO: validate for request param also above


export default router;

// TODO: central validation middleware for request params and request body using zod schemas