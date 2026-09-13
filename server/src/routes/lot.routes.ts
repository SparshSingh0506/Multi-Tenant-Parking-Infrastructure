import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { getStaticLotDataController, postInitLotDataController, postVehicleEntryController, postVehicleExitController } from "@/controllers/lot.controllers.js";
import { staticLotDetailsSchema, InitLotDataSchema, vehicleEntrySchema, vehicleExitSchema } from "@/zod-schemas/lot.schema.js";

const router = new Hono();

router.post('/', zValidator('json', InitLotDataSchema), postInitLotDataController);
router.get('/:lotId', zValidator('param', staticLotDetailsSchema), getStaticLotDataController);
router.post('/:lotId/entry', zValidator('json', vehicleEntrySchema), postVehicleEntryController);
router.post('/:lotId/exit', zValidator('json', vehicleExitSchema), postVehicleExitController); //TODO: make it a PATCH request
// TODO: validate for request param also above


export default router;