import type { Context } from "hono";

import { adminLoginService, adminRegisterService } from "../services/auth.services.js";
import type { AdminLogin, AdminRegister } from "../schemas/zod/admin-auth.schema.js";


export const adminRegisterController = async (c: Context) => {
  const body = await c.req.json<AdminRegister>();
  const admin = await adminRegisterService(body);

  c.status(201);

  return c.json({
    message: "Admin registered successfully.",
    data: { ...admin }
  });
}


export const adminLoginController = async (c: Context) => {
  const body = await c.req.json<AdminLogin>();
  const token = await adminLoginService(body.email, body.password);

  c.status(200);

  return c.json({
    message: "Admin logged in successfully.",
    data: token, 
  });
}