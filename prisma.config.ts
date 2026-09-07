import "dotenv/config";
import path from "node:path";
import { defineConfig } from "prisma/config";

/**
 * Prisma 7 reads migration/introspection connection details from here rather
 * than from `datasource db` in the schema. The running app does not use this
 * file at all — it connects through the Neon driver adapter in
 * `src/lib/prisma.ts`.
 *
 * DIRECT_URL is Neon's *unpooled* host. Migrations must not go through PgBouncer.
 *
 * The datasource block is attached only when DIRECT_URL is actually set.
 * Prisma treats it as optional: `migrate` and `db pull` need it, but
 * `generate` does not — and `generate` runs from `postinstall` on every
 * deploy. Resolving it eagerly with `env("DIRECT_URL")` threw
 * PrismaConfigEnvError during `npm install` on Vercel, failing the build over
 * a variable that step never reads.
 */
const directUrl = process.env.DIRECT_URL;

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  ...(directUrl ? { datasource: { url: directUrl } } : {}),
});
