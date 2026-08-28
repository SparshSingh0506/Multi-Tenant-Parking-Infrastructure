import { Hono } from "hono";
import { getOrganizationController } from "@/controllers/organization.controllers.js";

const router = new Hono();

router.get('/', getOrganizationController);

export default router;