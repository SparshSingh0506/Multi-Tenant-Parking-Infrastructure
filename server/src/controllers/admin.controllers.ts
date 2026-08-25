import type { Context } from "hono";


export const postOnboardingController = (c: Context) => {

}


export const getDashboardController = (c: Context) => {

  return c.json({
    message: "Admin dashboard retrieved successfully.",
    data: {}
  });
}
