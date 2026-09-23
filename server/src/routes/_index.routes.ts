import { Hono } from "hono";

import authRouter from "./auth.routes.js";
//import userRouter from "./user.routes.js";
//import dashboardRouter from "./dashboard.routes.js";
import lotRouter from "./lot.routes.js";
import ticketRouter from "./ticket.routes.js";

export const index = new Hono();

index.route('/auth', authRouter); // /api/v1/auth/*
//index.route('/users', userRouter);
index.route('/lots', lotRouter);
index.route('/tickets', ticketRouter);
//index.route('/dashboards', dashboardRouter);

// TODO: add auth middleware to all routes
// TODO: central validation middleware for request params and request body
// TODO: global error handler
