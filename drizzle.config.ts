import type { Config } from "drizzle-kit";
export default {
  schema: "./src/lib/server/db/schema",
  out: "./drizzle",
} satisfies Config;