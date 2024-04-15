import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { user } from "./db/schema";
import { config } from "dotenv";
import { eq } from "drizzle-orm";

config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function call() {
    const userData = await db.select().from(user).where(eq(user.email, "hi"));
    console.log(userData, userData.length);
}

call();
