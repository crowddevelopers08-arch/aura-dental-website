import Link from "next/link";
import {
  LEAD_SOURCES,
  LEAD_STATUSES,
  SOURCE_LABELS,
  STATUS_LABELS,
} from "@/lib/leads";
import type { LeadFilters } from "@/lib/lead-query";

const CONTROL =
  "h-9 rounded-[6px] border border-black/15 bg-white px-2.5 text-[13px] text-[#0b0b0b] outline-none focus:border-[#1d4231] focus:ring-2 focus:ring-[#1d4231]/20";

/**
 * One row of filters above the table. A plain GET form, so it works without
 * JavaScript, the state lives in the URL, and the Excel export can be a bare
 * link that inherits exactly the same querystring.
 */
export default function FilterBar({
  filters,
  exportQuery,
}: {
  filters: LeadFilters;
  exportQuery: string;
}) {
  const iso = (d: Date | null) => (d ? d.toISOString().slice(0, 10) : "");
  const isFiltered =
    Boolean(filters.q) || filters.source || filters.status || filters.from || filters.to;

  return (
    <div className="flex flex-wrap items-end gap-2">
      <form method="GET" action="/dashboard" className="flex flex-wrap items-end gap-2">
        <label className="flex flex-col gap-1">
          <span className="text-[12px] font-medium text-[#52514e]">Search</span>
          <input
            type="search"
            name="q"
            defaultValue={filters.q}
            placeholder="Name, email, phone, treatment"
            className={`${CONTROL} w-[230px]`}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[12px] font-medium text-[#52514e]">Source</span>
          <select name="source" defaultValue={filters.source ?? ""} className={CONTROL}>
            <option value="">All sources</option>
            {LEAD_SOURCES.map((s) => (
              <option key={s} value={s}>
                {SOURCE_LABELS[s]}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[12px] font-medium text-[#52514e]">Status</span>
          <select name="status" defaultValue={filters.status ?? ""} className={CONTROL}>
            <option value="">All statuses</option>
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[12px] font-medium text-[#52514e]">From</span>
          <input type="date" name="from" defaultValue={iso(filters.from)} className={CONTROL} />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[12px] font-medium text-[#52514e]">To</span>
          <input type="date" name="to" defaultValue={iso(filters.to)} className={CONTROL} />
        </label>

        <button
          type="submit"
          className="h-9 rounded-[6px] bg-[#1d4231] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#163527]"
        >
          Apply
        </button>

        {isFiltered && (
          <Link
            href="/dashboard"
            className="h-9 rounded-[6px] border border-black/15 px-3 text-[13px] font-medium leading-9 text-[#52514e] transition-colors hover:bg-[#f0efec]"
          >
            Clear
          </Link>
        )}
      </form>

      {/* Outside the form so submitting the filters never triggers a download. */}
      <a
        href={`/api/leads/export${exportQuery}`}
        className="ml-auto h-9 rounded-[6px] border border-[#1d4231] px-4 text-[13px] font-semibold leading-9 text-[#1d4231] transition-colors hover:bg-[#1d4231] hover:text-white"
      >
        Download Excel
      </a>
    </div>
  );
}
