// this file will tell drizzle where are schemas file is located
// this is to config schemas with drizzle terminal push commands

import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

export default {
  driver: "pg",
  schema: "./src/lib/db/schema.ts",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;

// so that we can use -> npx drizzle-kit push:pg
// NOTE - the site of Drizzle studio is as of now working on http://127.0.0.1:4983

