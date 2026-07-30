import { Hono } from "hono";

import { authRouter } from "./auth.routes.js";
import { adminRouter } from "./admin.routes.js";


export const indexRouter = new Hono();

indexRouter.route('/auth', authRouter);
indexRouter.route('/admin', adminRouter);
