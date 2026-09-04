import { Hono } from "hono";
import { postLotController } from "@/controllers/lot.controllers.js";

const router = new Hono();

router.post('/', postLotController);

export default router;