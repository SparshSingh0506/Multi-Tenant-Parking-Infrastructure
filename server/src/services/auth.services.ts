import { id } from "zod/locales";
import { createAdmin, getAdminByEmail } from "../repository/admin.repository.js";
import type { AdminRegister } from "../schemas/zod/admin-auth.schema.js";

import { compare, hash } from "bcrypt-ts";
import { sign } from "hono/jwt";
import { env } from "../config/env.config.js";

const SALT_ROUNDS = 10;

export const adminRegisterService = async (admin: AdminRegister) => {
  const { name, email, password } = admin;

  const existingAdmin = await getAdminByEmail(email);

  if (existingAdmin) {
    throw new Error("Admin already exists.");
  }

  const hashedPassword = await hash(password, SALT_ROUNDS);

  const newAdmin = await createAdmin({ name, email, hashed_password: hashedPassword });

  return {
    name: newAdmin.name,
    email: newAdmin.email
  }
}


export const adminLoginService = async (email: string, password: string) => {
  const admin = await getAdminByEmail(email);

  if (!admin) {
    throw new Error("Admin not found.");
  }

  const { id, hashed_password } = admin;

  const isMatch = await compare(password, hashed_password);

  if (!isMatch) {
    throw new Error("Invalid password.");
  }

  const payload = {
    sub: id
  }

  const secretKey = env.JWT_SECRET;

  const token = await sign(payload, secretKey, 'HS256');

  return token;
}
