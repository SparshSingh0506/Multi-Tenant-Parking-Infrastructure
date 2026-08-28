import { Hono } from "hono";
import { auth } from '@/configs/auth.config.js';

const router = new Hono();

router.on(["POST", "GET"], "/*", (c) => auth.handler(c.req.raw));

export default router;