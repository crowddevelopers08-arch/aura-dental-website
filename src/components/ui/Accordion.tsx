"use client";

import { useState } from "react";
import type { FaqItem } from "@/data/services";

type Props = {
  items: FaqItem[];
  /** Rendered on the dark green band (home page) or on white (service pages). */
  tone?: "light" | "dark";
  defaultOpen?: number | null;
};

export default function Accordion({ items, tone = "light", defaultOpen = 0 }: Props) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  const isDark = tone === "dark";
  // Both tones are plain rows divided by a hairline — only the palette differs.
  const wrap = isDark ? "border-b border-white/25" : "border-b border-[#e2e2e2]";
  const qColor = isDark ? "text-white" : "text-black";
  const iconColor = isDark ? "text-[#d3b871]" : "text-black";
  const aColor = isDark ? "text-white/90" : "text-[#444]";

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question} className={wrap}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-4 py-6 text-left"
            >
              {/* `.aw_accordion_question` — 20px and explicitly Open Sans, not the heading face */}
              <h4
                className={`font-sans text-[20px] font-semibold leading-snug ${qColor}`}
              >
                {item.question}
              </h4>
              <span className={`mt-1 shrink-0 ${iconColor}`} aria-hidden="true">
                {isOpen ? (
                  <svg viewBox="0 0 448 512" className="h-5 w-5 fill-current">
                    <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 448 512" className="h-5 w-5 fill-current">
                    <path d="M448 294.2v-76.4c0-13.3-10.7-24-24-24H286.2V56c0-13.3-10.7-24-24-24h-76.4c-13.3 0-24 10.7-24 24v137.8H24c-13.3 0-24 10.7-24 24v76.4c0 13.3 10.7 24 24 24h137.8V456c0 13.3 10.7 24 24 24h76.4c13.3 0 24-10.7 24-24V318.2H424c13.3 0 24-10.7 24-24z" />
                  </svg>
                )}
              </span>
            </button>

            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="pb-6">
                  {item.answer && (
                    <p className={`text-[18px] leading-[1.4] ${aColor}`}>{item.answer}</p>
                  )}
                  {item.bullets && (
                    <ul className={`${item.answer ? "mt-3" : ""} space-y-2`}>
                      {item.bullets.map((b) => (
                        <li
                          key={b}
                          className={`bg-[url('/images/list1.svg')] bg-position-[left_6px] bg-no-repeat pl-[25px] text-[18px] leading-[1.4] ${aColor}`}
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
