import { db } from "../configs/db.config.js";
import { eq } from "drizzle-orm";

import { user } from "@/db/schemas/index.schema.js";

export const getUserDetails = async () => {

}

type UserRole = "Manager" | "Operator";

// export const setUserRole = async (userId: string, newRole: UserRole) => {
//   await db
//     .update(user)
//     .set({ role: newRole })
//     .where(eq(user.id, userId));
// }

// export const setUserLotId = async (userId: string, lotId: string) => {
//   await db
//     .update(user)
//     .set({ lotId })
//     .where(eq(user.id, userId));
// }

export const setUserLotIdAndRole = async (userId: string, lotId: string, newRole: UserRole) => {
  await db.update(user)
    .set({ lotId, role: newRole })
    .where(eq(user.id, userId));
}
