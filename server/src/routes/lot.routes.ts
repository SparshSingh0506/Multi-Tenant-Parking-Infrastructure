import { Hono } from "hono";
import { postLotController } from "@/controllers/lot.controllers.js";
import { zValidator } from "@hono/zod-validator";
import { postLotSchema } from "@/zod-schemas/lot.schema.js";

const router = new Hono();

router.post('/', zValidator('json', postLotSchema), postLotController);

export default router;