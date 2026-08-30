import { Hono } from "hono";
import { postOnboardingController } from "@/controllers/onboarding.controllers.js";

const router = new Hono();

router.post('/', postOnboardingController);

export default router;