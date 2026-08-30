import { defineRelations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, index, type AnyPgColumn, uuid } from "drizzle-orm/pg-core";

import { parkingLot } from "./db.schema.js";


export const user = pgTable("user", {
  id: text().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdateFn(() => new Date())
    .notNull(),

  // additional fields:
  managerId: text("manager_id").references((): AnyPgColumn => user.id, { onDelete: "set null" }), // null: user is manager, not null: user is operator and this field references the manager's id
  parkingLotId: uuid("parking_lot_id").references((): AnyPgColumn => parkingLot.id, { onDelete: "cascade" })
});

export const session = pgTable("session", {
  id: text().primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text().notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdateFn(() => new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
},
  (table) => [
    index("session_userId_idx").on(table.userId)
  ]
);

export const account = pgTable("account", {
  id: text().primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text(),
  password: text(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdateFn(() => new Date())
    .notNull(),
  issuer: text("issuer"), 
},
  (table) => [
    index("account_userId_idx").on(table.userId)
  ]
);

export const verification = pgTable("verification", {
  id: text().primaryKey(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdateFn(() => new Date())
    .notNull(),
},
  (table) => [
    index("verification_identifier_idx").on(table.identifier)
  ]
);

export const authRelations = defineRelations(
  { user, session, account }, 
  (r) => ({
    user: {
      sessions: r.many.session(),
      accounts: r.many.account(),
    },
    session: {
      user: r.one.user({
        from: r.session.userId, 
        to: r.user.id,
      }),
    },
    account: {
      user: r.one.user({
        from: r.account.userId,
        to: r.user.id,
      }),
    },
  })
);
