import { Hono } from "hono";
import app from "../app.js";

import { adminRouter } from "./admin.routes.js";

export const indexRouter = new Hono();

indexRouter.route('/admin', adminRouter);
