import { Hono } from "hono";
import { getDashboardController } from "@/controllers/dashboard.controllers.js";

const router = new Hono();

router.get('/', getDashboardController);

export default router;