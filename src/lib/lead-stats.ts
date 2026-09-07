import { prisma } from "@/lib/prisma";
import { LEAD_STATUSES, LEAD_SOURCES, type LeadSource, type LeadStatus } from "@/lib/leads";

/** One bar/point of the 30-day trend. `day` is yyyy-mm-dd in IST. */
export type DayCount = { day: string; count: number };

export type LeadStats = {
  total: number;
  last7: number;
  byStatus: Record<LeadStatus, number>;
  bySource: Record<LeadSource, number>;
  daily: DayCount[];
  unsynced: number;
};

const TREND_DAYS = 30;

/** yyyy-mm-dd for a Date, read in IST — matches how the SQL buckets. */
function istDay(date: Date): string {
  // en-CA gives ISO-ordered parts, so this is a yyyy-mm-dd without hand-rolling.
  return date.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
}

/**
 * Everything the dashboard header needs, in one round trip.
 *
 * These are deliberately unfiltered: the tiles describe the whole pipeline, so
 * they stay put while the operator filters the table underneath them.
 */
export async function getLeadStats(): Promise<LeadStats> {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [total, last7, statusGroups, sourceGroups, unsynced, rawDaily] =
    await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
      prisma.lead.groupBy({ by: ["status"], _count: { _all: true } }),
      prisma.lead.groupBy({ by: ["source"], _count: { _all: true } }),
      prisma.lead.count({ where: { syncedToSheet: false } }),
      // Bucketed in IST so "today" means the clinic's today, not UTC's.
      prisma.$queryRaw<{ day: Date; count: number }[]>`
        SELECT (created_at AT TIME ZONE 'Asia/Kolkata')::date AS day,
               COUNT(*)::int AS count
        FROM leads
        WHERE created_at >= NOW() - make_interval(days => ${TREND_DAYS})
        GROUP BY 1
        ORDER BY 1
      `,
    ]);

  const byStatus = Object.fromEntries(
    LEAD_STATUSES.map((s) => [s, 0])
  ) as Record<LeadStatus, number>;
  for (const g of statusGroups) {
    byStatus[g.status as LeadStatus] = g._count._all;
  }

  const bySource = Object.fromEntries(
    LEAD_SOURCES.map((s) => [s, 0])
  ) as Record<LeadSource, number>;
  for (const g of sourceGroups) {
    bySource[g.source as LeadSource] = g._count._all;
  }

  // Postgres only returns days that have rows; the chart needs a continuous
  // axis, so gaps become explicit zeroes.
  const counts = new Map(rawDaily.map((r) => [istDay(new Date(r.day)), Number(r.count)]));
  const daily: DayCount[] = [];
  for (let i = TREND_DAYS - 1; i >= 0; i--) {
    const day = istDay(new Date(Date.now() - i * 24 * 60 * 60 * 1000));
    daily.push({ day, count: counts.get(day) ?? 0 });
  }

  return { total, last7, byStatus, bySource, daily, unsynced };
}
