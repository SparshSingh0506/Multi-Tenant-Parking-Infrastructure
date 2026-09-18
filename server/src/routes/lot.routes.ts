import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { lotIdParamSchema, createLotSchema, joinLotSchema } from "@/zod-schemas/lot.schema.js";
import { initTicketSchema } from "@/zod-schemas/ticket.schema.js";

import { getStaticLotDataController, postCreateLotController, postJoinLotController} from "@/controllers/lot.controllers.js";
import { postInitTicketController } from "@/controllers/ticket.controllers.js";


const router = new Hono();

router.post('/create', zValidator('json', createLotSchema), postCreateLotController);
router.post('/join', zValidator('json', joinLotSchema), postJoinLotController);

router.get('/:lotId', zValidator('param', lotIdParamSchema), getStaticLotDataController);
router.post('/:lotId/tickets', zValidator('param', lotIdParamSchema), zValidator('json', initTicketSchema), postInitTicketController);

router.get('/:lotId/operators', zValidator('param', lotIdParamSchema), );

export default router;

/*
Flow of joining a parking lot as an operator:
Manager
  │
  │ creates parking lot
  ▼
ParkingLot
  │
  │ generates join token
  ▼
"ABC-X7K-92P"
  │
  │ manager shares token
  ▼
Operator signs up
  │
  │ enters token in "Join Parking Lot"
  ▼
Join Request
  │
  │
  ▼
Manager approves
  │
  ▼
Operator becomes member
*/

