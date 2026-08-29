import { getOperatorDashboardService } from "@/services/dashboard.services.js";
import type { Context } from "hono";


export const getOperatorDashboardController = async (c: Context) => {
  const body = await c.req.json();
  const data = getOperatorDashboardService(); 

  return c.json({ data }, 200);
}
