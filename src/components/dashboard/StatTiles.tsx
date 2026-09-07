import type { LeadStats } from "@/lib/lead-stats";

/**
 * A handful of headline numbers is a KPI row, not a chart — no bars, no pie.
 * The values are unfiltered on purpose: they describe the whole pipeline and
 * stay still while the table below is filtered.
 */
export default function StatTiles({ stats }: { stats: LeadStats }) {
  const tiles: { label: string; value: number; note: string }[] = [
    {
      label: "Total leads",
      value: stats.total,
      note: "All time, both sources",
    },
    {
      label: "Last 7 days",
      value: stats.last7,
      note: "New enquiries this week",
    },
    {
      label: "Awaiting contact",
      value: stats.byStatus.NEW,
      note: "Still marked New",
    },
    {
      label: "Converted",
      value: stats.byStatus.CONVERTED,
      note:
        stats.total > 0
          ? `${Math.round((stats.byStatus.CONVERTED / stats.total) * 100)}% of all leads`
          : "No leads yet",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {tiles.map((t) => (
        <div key={t.label} className="rounded-[10px] border border-black/10 bg-white p-4">
          <p className="text-[13px] font-medium text-[#52514e]">{t.label}</p>
          <p className="mt-1 text-[32px] font-semibold leading-none text-[#0b0b0b]">
            {t.value}
          </p>
          <p className="mt-1.5 text-[12px] text-[#898781]">{t.note}</p>
        </div>
      ))}
    </div>
  );
}
