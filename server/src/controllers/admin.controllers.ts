import type { Context } from "hono";
import { adminRegisterService } from "../services/admin.services.js";
import type { AdminRegister } from "../schemas/zod/admin-auth.schema.js";

export const adminRegisterController = async (c: Context) => {
  const body = await c.req.json<AdminRegister>();
  const admin = await adminRegisterService(body);
  
  c.status(200);

  return c.json({
    message: "Admin registered successfully.",
    data: { 
      name: admin.name,
      email: admin.email
    } 
  });
}

export const adminLoginController = (c: Context) => {

  c.status(200);
  return c.json({ 

  });
}

export const adminDashboardController = (c: Context) => {
  
  return c.json({
    message: "Admin dashboard retrieved successfully." ,
    data: {}
  }); 
}
