import z from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number(),
  DATABASE_URL: z.url(),
  //JWT_SECRET: z.string().min(1),
})