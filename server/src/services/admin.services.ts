import { createAdmin, getAdminByEmail } from "../repository/admin.repository.js";
import type { AdminRegister } from "../schemas/zod/admin-auth.schema.js";
import { hash,  } from "bcrypt-ts";

export const adminRegisterService = async (admin: AdminRegister) => {
  const { name, email, password } = admin;

  const existingAdmin = await getAdminByEmail(email);

  if (existingAdmin) {
    throw new Error("Admin already exists");
  }
  
  const hashedPassword = await hash(password, 10);

  return await createAdmin({ name, email, hashed_password: hashedPassword });
}


export const adminLoginService = async (email: string, password: string) => {
  const admin = await getAdminByEmail(email);

  if (!admin) {
    throw new Error("Admin not found");
  }

  // const isMatch = await verify(password, admin.hashed_password);

  // if (!isMatch) {
  //   throw new Error("Invalid password");
  // }

  // return admin;
}


export const adminDashboardService = async (adminId: string) => {

}