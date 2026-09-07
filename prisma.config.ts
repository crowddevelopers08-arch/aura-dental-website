import "dotenv/config";
import path from "node:path";
import { defineConfig, env } from "prisma/config";

/**
 * Prisma 7 reads migration/introspection connection details from here rather
 * than from `datasource db` in the schema. The running app does not use this
 * file at all — it connects through the Neon driver adapter in
 * `src/lib/prisma.ts`.
 *
 * DIRECT_URL is Neon's *unpooled* host. Migrations must not go through PgBouncer.
 */
export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  datasource: {
    url: env("DIRECT_URL"),
  },
});
