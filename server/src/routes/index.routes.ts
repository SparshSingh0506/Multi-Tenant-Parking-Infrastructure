import { Hono } from "hono";

import { authRouter } from "./auth.routes.js";

export const index = new Hono();

index.route('/auth', authRouter); // POST, GET : /api/v1/auth/*
