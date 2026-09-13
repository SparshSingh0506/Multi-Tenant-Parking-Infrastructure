import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { getStaticLotDataController, postInitLotDataController, postVehicleEntryController } from "@/controllers/lot.controllers.js";
import { getLotSchema, postLotSchema, postVehicleEntrySchema } from "@/zod-schemas/lot.schema.js";

const router = new Hono();

router.post('/', zValidator('json', postLotSchema), postInitLotDataController);
router.get('/:lotId', zValidator('param', getLotSchema), getStaticLotDataController);
router.post('/entry', zValidator('json', postVehicleEntrySchema), postVehicleEntryController);

export default router;