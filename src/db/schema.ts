import { sql } from "drizzle-orm";
import { pgTable, varchar, uuid } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    id: uuid("user_id")
        .default(sql`gen_random_uuid()`)
        .notNull()
        .primaryKey(),
    email: varchar("email").notNull().unique(),
    userName: varchar("name", { length: 20 }),
    password: varchar("password").notNull(),
});
