import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { adminRegisterSchema } from "../schemas/zod/admin-auth.schema.js";
import { adminLoginController, adminRegisterController } from "../controllers/admin.controllers.js";

export const adminRouter = new Hono();

adminRouter.post('/register', zValidator('json', adminRegisterSchema), adminRegisterController);
adminRouter.post('/login', zValidator('json', adminRegisterSchema), adminLoginController);
