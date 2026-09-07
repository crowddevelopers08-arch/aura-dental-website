"use client";

import { useState } from "react";
import type { DayCount } from "@/lib/lead-stats";

/**
 * Leads per day over the last 30 days.
 *
 * One series, so there is no legend and no categorical palette — the title
 * names it and the single hue is the brand green. The SVG is stretched with
 * `preserveAspectRatio="none"` (a time axis wants full width at a fixed
 * height), which would distort round marks, so the hover marker, crosshair and
 * tooltip are HTML positioned over the top instead of SVG children. The line
 * itself keeps a true 2px via `vector-effect="non-scaling-stroke"`.
 */

const VB_W = 720;
const VB_H = 180;
const PAD_TOP = 14;

const LINE = "#1d4231";
const GRID = "#e1e0d9";

function shortDate(day: string): string {
  // `day` is yyyy-mm-dd; parse as UTC so the label can't slip a day.
  return new Date(`${day}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

export default function TrendChart({ data }: { data: DayCount[] }) {
  const [hover, setHover] = useState<number | null>(null);

  if (data.length < 2) return null;

  const yMax = Math.max(1, ...data.map((d) => d.count));
  const lastIndex = data.length - 1;

  const x = (i: number) => (i / lastIndex) * VB_W;
  const y = (count: number) => VB_H - (count / yMax) * (VB_H - PAD_TOP);

  const line = data.map((d, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(d.count)}`).join(" ");
  const area = `${line} L${VB_W},${VB_H} L0,${VB_H} Z`;

  const active = hover === null ? null : data[hover];
  const total = data.reduce((sum, d) => sum + d.count, 0);

  /** Nearest point to the pointer, so the whole plot is a hit target. */
  function track(e: React.PointerEvent<HTMLDivElement>) {
    const box = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - box.left) / box.width;
    setHover(Math.max(0, Math.min(lastIndex, Math.round(ratio * lastIndex))));
  }

  return (
    <figure className="rounded-[10px] border border-black/10 bg-white p-5">
      <figcaption className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-[15px] font-semibold text-[#0b0b0b]">Leads per day</h2>
        <p className="text-[13px] text-[#52514e]">
          Last 30 days · <span className="font-semibold text-[#0b0b0b]">{total}</span> total
        </p>
      </figcaption>

      <div
        className="relative touch-none"
        style={{ height: VB_H }}
        onPointerMove={track}
        onPointerLeave={() => setHover(null)}
      >
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="none"
          className="h-full w-full overflow-visible"
          role="img"
          aria-label={`Leads per day for the last 30 days. Peak ${yMax} in a day, ${total} in total.`}
        >
          <defs>
            <linearGradient id="lead-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={LINE} stopOpacity="0.20" />
              <stop offset="100%" stopColor={LINE} stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Recessive gridlines at 0, half and peak. */}
          {[0, 0.5, 1].map((t) => (
            <line
              key={t}
              x1={0}
              x2={VB_W}
              y1={y(yMax * t)}
              y2={y(yMax * t)}
              stroke={GRID}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          ))}

          <path d={area} fill="url(#lead-area)" />
          <path
            d={line}
            fill="none"
            stroke={LINE}
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Peak and zero, as HTML so they never scale with the viewBox. */}
        <span className="pointer-events-none absolute left-0 top-0 bg-white/85 px-1 text-[11px] tabular-nums text-[#898781]">
          {yMax}
        </span>
        <span className="pointer-events-none absolute bottom-0 left-0 bg-white/85 px-1 text-[11px] tabular-nums text-[#898781]">
          0
        </span>

        {hover !== null && active && (
          <>
            <div
              className="pointer-events-none absolute top-0 w-px bg-[#c3c2b7]"
              style={{ left: `${(hover / lastIndex) * 100}%`, height: VB_H }}
            />
            <div
              className="pointer-events-none absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#1d4231]"
              style={{
                left: `${(hover / lastIndex) * 100}%`,
                top: (y(active.count) / VB_H) * 100 + "%",
              }}
            />
            <div
              className="pointer-events-none absolute -top-1 z-10 -translate-y-full rounded-[6px] bg-[#0b0b0b] px-2.5 py-1.5 text-[12px] leading-tight text-white shadow-lg"
              style={{
                left: `${(hover / lastIndex) * 100}%`,
                // Keep the tooltip inside the plot at both ends.
                transform: `translate(${
                  hover / lastIndex < 0.1 ? "0" : hover / lastIndex > 0.9 ? "-100%" : "-50%"
                }, -100%)`,
              }}
            >
              <span className="block font-semibold tabular-nums">
                {active.count} {active.count === 1 ? "lead" : "leads"}
              </span>
              <span className="block text-white/70">{shortDate(active.day)}</span>
            </div>
          </>
        )}
      </div>

      <div className="mt-2 flex justify-between text-[11px] text-[#898781]">
        <span>{shortDate(data[0].day)}</span>
        <span>{shortDate(data[Math.floor(lastIndex / 2)].day)}</span>
        <span>{shortDate(data[lastIndex].day)}</span>
      </div>

      {/* The table view the chart's data is also available as. */}
      <table className="sr-only">
        <caption>Leads per day, last 30 days</caption>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Leads</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.day}>
              <th scope="row">{shortDate(d.day)}</th>
              <td>{d.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
