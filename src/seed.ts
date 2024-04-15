import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { user } from "./db/schema";
import { config } from "dotenv";

config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function call() {
    const userData = await db
        .select({
            id: user.id,
            password: user.password,
            userName: user.userName,
        })
        .from(user);
    console.log(userData);
}

call();
