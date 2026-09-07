"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LEAD_STATUSES, STATUS_LABELS, type LeadStatus } from "@/lib/leads";
import { STATUS_STYLES } from "@/components/dashboard/status-styles";

/**
 * The status badge doubles as its own editor: a native `<select>` laid
 * transparently over the chip, so the closed control reads as a badge but the
 * open one is the platform picker (keyboard nav and mobile wheel included).
 */
export default function StatusSelect({
  id,
  value,
}: {
  id: string;
  value: LeadStatus;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<LeadStatus>(value);
  const [failed, setFailed] = useState(false);
  const [pending, startTransition] = useTransition();

  async function change(next: LeadStatus) {
    const previous = status;
    // Optimistic: the operator is working a list and shouldn't wait per row.
    setStatus(next);
    setFailed(false);

    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });

      if (!res.ok) throw new Error(String(res.status));
      // Re-run the server component so the tiles and counts follow the change.
      startTransition(() => router.refresh());
    } catch {
      setStatus(previous);
      setFailed(true);
    }
  }

  const style = STATUS_STYLES[status];

  return (
    <span className="relative inline-flex items-center">
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold ${style.chip} ${
          pending ? "opacity-60" : ""
        }`}
      >
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ background: style.dot }}
        />
        {STATUS_LABELS[status]}
        {failed && <span className="text-[#d03b3b]"> · retry</span>}
      </span>

      <select
        aria-label={`Status${failed ? " (last change failed)" : ""}`}
        value={status}
        onChange={(e) => change(e.target.value as LeadStatus)}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      >
        {LEAD_STATUSES.map((s) => (
          <option key={s} value={s}>
            {STATUS_LABELS[s]}
          </option>
        ))}
      </select>
    </span>
  );
}
