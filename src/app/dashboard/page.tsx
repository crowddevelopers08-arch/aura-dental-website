import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getLeadStats } from "@/lib/lead-stats";
import { buildWhere, parseFilters, PAGE_SIZE, withParam } from "@/lib/lead-query";
import { SOURCE_LABELS } from "@/lib/leads";
import StatTiles from "@/components/dashboard/StatTiles";
import TrendChart from "@/components/dashboard/TrendChart";
import FilterBar from "@/components/dashboard/FilterBar";
import LeadsTable from "@/components/dashboard/LeadsTable";

/** Live data on every request — never prerendered, never cached. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Leads · Aura Dental",
  // Internal tool: keep it out of search results even though it is unguarded.
  robots: { index: false, follow: false, nocache: true },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const filters = parseFilters(await searchParams);
  const where = buildWhere(filters);

  let data;
  try {
    const [stats, leads, matching] = await Promise.all([
      getLeadStats(),
      prisma.lead.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (filters.page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
      }),
      prisma.lead.count({ where }),
    ]);
    data = { stats, leads, matching };
  } catch (err) {
    console.error("[dashboard] query failed:", err);
    return <NotConnected />;
  }

  const { stats, leads, matching } = data;
  const lastPage = Math.max(1, Math.ceil(matching / PAGE_SIZE));

  // The export link carries the current filters, minus paging — a download
  // should be the whole selection, not the page you happen to be looking at.
  const exportQuery = withParam(filters, {}).replace("/dashboard", "");

  return (
    <div className="min-h-screen bg-[#f7f7f5]">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-5 py-4">
          <div>
            <h1 className="text-[20px] font-semibold text-[#0b0b0b]">Leads</h1>
            <p className="text-[13px] text-[#52514e]">
              {SOURCE_LABELS.ENQUIRY_FORM} {stats.bySource.ENQUIRY_FORM} ·{" "}
              {SOURCE_LABELS.CHAT_WIDGET} {stats.bySource.CHAT_WIDGET}
              {stats.unsynced > 0 && (
                <span className="text-[#ec835a]"> · {stats.unsynced} not in sheet</span>
              )}
            </p>
          </div>
          <Link
            href="/"
            className="text-[13px] font-medium text-[#1d4231] underline underline-offset-2"
          >
            Back to site
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] space-y-5 px-5 py-6">
        <StatTiles stats={stats} />
        <TrendChart data={stats.daily} />

        <div className="space-y-3">
          <FilterBar filters={filters} exportQuery={exportQuery} />

          <p className="text-[13px] text-[#52514e]">
            {matching === stats.total
              ? `${matching} lead${matching === 1 ? "" : "s"}`
              : `${matching} of ${stats.total} leads match`}
          </p>

          <LeadsTable leads={leads} />

          {lastPage > 1 && (
            <nav
              aria-label="Pagination"
              className="flex items-center justify-between gap-3 text-[13px]"
            >
              <PageLink
                href={withParam(filters, { page: String(filters.page - 1) })}
                disabled={filters.page <= 1}
              >
                ← Previous
              </PageLink>
              <span className="text-[#52514e]">
                Page {filters.page} of {lastPage}
              </span>
              <PageLink
                href={withParam(filters, { page: String(filters.page + 1) })}
                disabled={filters.page >= lastPage}
              >
                Next →
              </PageLink>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}

function PageLink({
  href,
  disabled,
  children,
}: {
  href: string;
  disabled: boolean;
  children: React.ReactNode;
}) {
  if (disabled) {
    return (
      <span className="rounded-[6px] border border-black/10 px-3 py-1.5 text-[#c3c2b7]">
        {children}
      </span>
    );
  }
  return (
    <Link
      href={href}
      className="rounded-[6px] border border-black/15 bg-white px-3 py-1.5 font-medium text-[#1d4231] transition-colors hover:bg-[#f0efec]"
    >
      {children}
    </Link>
  );
}

/**
 * Shown when Neon is unreachable — almost always a missing or placeholder
 * DATABASE_URL rather than a real outage, so it says what to do about it.
 */
function NotConnected() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f7f5] px-5">
      <div className="max-w-[520px] rounded-[10px] border border-black/10 bg-white p-8">
        <h1 className="text-[20px] font-semibold text-[#0b0b0b]">Database not connected</h1>
        <p className="mt-2 text-[14px] leading-relaxed text-[#52514e]">
          The dashboard could not reach Neon. Copy <code>.env.example</code> to{" "}
          <code>.env</code>, paste your <code>DATABASE_URL</code> (the pooled host) and{" "}
          <code>DIRECT_URL</code> (the direct host), then run:
        </p>
        <pre className="mt-3 overflow-x-auto rounded-[6px] bg-[#f0efec] p-3 text-[13px] text-[#0b0b0b]">
          npx prisma migrate deploy
        </pre>
        <p className="mt-3 text-[13px] text-[#898781]">
          The exact error is in the server console.
        </p>
      </div>
    </div>
  );
}
