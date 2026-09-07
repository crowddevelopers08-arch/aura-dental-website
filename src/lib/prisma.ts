import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

/**
 * Prisma 7 connects through a driver adapter rather than a `url` in the schema.
 * `PrismaNeon` opens a WebSocket pool against Neon, which is what lets a
 * serverless function reuse connections instead of exhausting Postgres.
 *
 * DATABASE_URL must be the POOLED Neon host (the one containing "-pooler").
 */
function createClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Copy .env.example to .env and paste your Neon connection strings."
    );
  }

  return new PrismaClient({
    adapter: new PrismaNeon({ connectionString }),
    // Queries are worth seeing locally; in production they are noise.
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

/**
 * Next's dev server re-evaluates modules on every edit. Without this the pool
 * would be recreated each time and Neon would run out of connections.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
