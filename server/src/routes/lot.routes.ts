import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { getLotController, postLotController, postVehicleEntryController } from "@/controllers/lot.controllers.js";
import { postLotSchema, postVehicleEntrySchema } from "@/zod-schemas/lot.schema.js";

const router = new Hono();

router.post('/', zValidator('json', postLotSchema), postLotController);
router.get('/:lotId', getLotController);
router.post('/entry', zValidator('json', postVehicleEntrySchema), postVehicleEntryController);

export default router;