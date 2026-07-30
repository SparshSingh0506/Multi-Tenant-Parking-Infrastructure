import type { Context } from "hono";

export const adminDashboardController = (c: Context) => {

  return c.json({
    message: "Admin dashboard retrieved successfully.",
    data: {}
  });
}
