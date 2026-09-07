import type { Lead } from "@prisma/client";
import StatusSelect from "@/components/dashboard/StatusSelect";
import { displayPhone, SOURCE_LABELS, type LeadSource, type LeadStatus } from "@/lib/leads";

const TH =
  "whitespace-nowrap px-3 py-2.5 text-left text-[12px] font-semibold uppercase tracking-wide text-[#52514e]";
const TD = "px-3 py-3 align-top text-[13px] text-[#0b0b0b]";

/** "5 Sep 2026, 4:12 pm" in the clinic's own timezone. */
function received(date: Date): { date: string; time: string } {
  return {
    date: date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    }),
    time: date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
    }),
  };
}

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  if (!leads.length) {
    return (
      <div className="rounded-[10px] border border-black/10 bg-white p-10 text-center">
        <p className="text-[15px] font-semibold text-[#0b0b0b]">No leads match these filters</p>
        <p className="mt-1 text-[13px] text-[#52514e]">
          Clear the filters, or widen the date range.
        </p>
      </div>
    );
  }

  return (
    // Wide table scrolls inside its own box; the page never scrolls sideways.
    <div className="overflow-x-auto rounded-[10px] border border-black/10 bg-white">
      <table className="w-full min-w-[900px] border-collapse">
        <thead className="border-b border-black/10 bg-[#faf9f7]">
          <tr>
            <th scope="col" className={TH}>Received</th>
            <th scope="col" className={TH}>Name</th>
            <th scope="col" className={TH}>Contact</th>
            <th scope="col" className={TH}>Treatment</th>
            <th scope="col" className={TH}>Location</th>
            <th scope="col" className={TH}>Source</th>
            <th scope="col" className={TH}>Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => {
            const when = received(lead.createdAt);
            return (
              <tr key={lead.id} className="border-b border-black/[0.06] last:border-0">
                <td className={`${TD} whitespace-nowrap tabular-nums`}>
                  {when.date}
                  <span className="block text-[12px] text-[#898781]">{when.time}</span>
                </td>

                <td className={`${TD} font-medium`}>
                  {lead.name}
                  {!lead.syncedToSheet && (
                    <span
                      title="Not mirrored to Google Sheets"
                      className="mt-1 block text-[11px] font-normal text-[#ec835a]"
                    >
                      Not in sheet
                    </span>
                  )}
                </td>

                <td className={TD}>
                  <a
                    href={`mailto:${lead.email}`}
                    className="block break-all text-[#1d4231] underline underline-offset-2"
                  >
                    {lead.email}
                  </a>
                  <a
                    href={`tel:${displayPhone(lead).replace(/\s/g, "")}`}
                    className="mt-0.5 block whitespace-nowrap tabular-nums text-[#52514e]"
                  >
                    {displayPhone(lead)}
                  </a>
                </td>

                <td className={TD}>{lead.treatment || <Dash />}</td>
                <td className={TD}>{lead.location || <Dash />}</td>

                <td className={TD}>
                  {SOURCE_LABELS[lead.source as LeadSource] ?? lead.source}
                  {lead.pagePath && (
                    <span className="mt-0.5 block text-[12px] text-[#898781]">
                      {lead.pagePath}
                    </span>
                  )}
                </td>

                <td className={TD}>
                  <StatusSelect id={lead.id} value={lead.status as LeadStatus} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Dash() {
  return <span className="text-[#c3c2b7]">—</span>;
}
