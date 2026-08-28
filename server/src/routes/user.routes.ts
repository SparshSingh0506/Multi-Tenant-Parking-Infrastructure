import { Hono } from "hono";
import { getUserController } from "@/controllers/user.controllers.js";

const router = new Hono();

router.get('/', getUserController);

export default router;