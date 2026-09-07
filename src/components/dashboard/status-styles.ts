import type { LeadStatus } from "@/lib/leads";

/**
 * Status is a reserved role, not a series colour — it never doubles as a chart
 * hue. Each badge pairs a coloured dot with its written label, so the state is
 * never carried by colour alone. Text sits on a tint of its own hue so the
 * label itself clears contrast even where the dot does not.
 */
export const STATUS_STYLES: Record<LeadStatus, { dot: string; chip: string }> = {
  NEW: { dot: "#fab219", chip: "bg-[#fdf3e0] text-[#7a5600]" },
  CONTACTED: { dot: "#2a78d6", chip: "bg-[#e8f0fc] text-[#184f95]" },
  CONVERTED: { dot: "#0ca30c", chip: "bg-[#e6f5e6] text-[#0b5c0b]" },
  CLOSED: { dot: "#898781", chip: "bg-[#f0efec] text-[#52514e]" },
};
