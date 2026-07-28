import { eq } from "drizzle-orm";
import {db} from "../config/db.config.js";
import { adminTable } from "../schemas/db/db.schema.js";

interface Admin {
  name: string;
  email: string;
  hashed_password: string;
}

export const createAdmin = async (admin: Admin): Promise<Admin> => {
  const result = await db.insert(adminTable).values(admin).returning();

  return result[0];
}

export const getAdminByEmail = async (email: string): Promise<Admin | undefined> => {
  const result = await db.select().from(adminTable).where(eq(adminTable.email, email)).limit(1);

  return result[0];
}

// export const getAdminDashboard = async (id: string, adminId: string) => {
//   const result = await db.select().from(adminTable).where(eq(id, adminId)); 
//   return result;
// }