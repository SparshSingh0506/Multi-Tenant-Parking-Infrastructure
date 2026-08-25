import { Hono } from "hono";
import { auth } from '@/configs/auth.config.js';

export const authRouter = new Hono();

authRouter.on(["POST", "GET"], "/*", (c) => auth.handler(c.req.raw));