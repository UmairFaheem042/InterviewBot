import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' }); 

import { defineConfig } from "drizzle-kit";

console.log("Database URL:", process.env.NEXT_PUBLIC_DRIZZLE_DB_URL);

export default defineConfig({
  out: "./drizzle",
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DRIZZLE_DB_URL,
  },
});
