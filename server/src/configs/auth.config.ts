import { betterAuth } from "better-auth/minimal";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/configs/db.config.js";
import { openAPI } from "better-auth/plugins";
import { env } from "@/configs/env.config.js";

import * as indexSchema from "@/db/schemas/index.schema.js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: indexSchema,
  }),

  emailAndPassword: {
    enabled: true,
  },

  plugins: [
    openAPI()
  ],

  baseURL: `http://localhost:${env.PORT}/api/v1/auth/`,

  user: {
    additionalFields: {
      managerId: {
        type: "string",
        required: false,
        input: false
      },
      organizationId: {
        type: "string",
        required: false,
        input: false
      },
    },
  }, 
});