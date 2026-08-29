import { Hono } from "hono";

import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";
import dashboardRouter from "./operator-dashboard.routes.js";

export const index = new Hono();

index.route('/auth', authRouter); // /api/v1/auth/*
index.route('/user', userRouter);
index.route('/dashboard-summary', dashboardRouter);

