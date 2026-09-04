import { Hono } from "hono";
import { getOperatorDashboardController } from "@/controllers/operator-dashboard.controllers.js";

const router = new Hono();

router.get('/operator', getOperatorDashboardController);
router.get('/manager', );

export default router;