import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { adminLoginSchema, adminRegisterSchema } from "../schemas/zod/admin-auth.schema.js";
import { adminLoginController, adminRegisterController } from "../controllers/auth.controllers.js";


export const authRouter = new Hono();

authRouter.post('/admin/register', zValidator('json', adminRegisterSchema), adminRegisterController);
authRouter.post('/admin/login', zValidator('json', adminLoginSchema), adminLoginController);
