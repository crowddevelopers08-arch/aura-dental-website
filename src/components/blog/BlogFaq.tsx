"use client";

import { useState } from "react";

export type FaqEntry = { q: string; a: { html: string }[] };

/**
 * `.kl-faq` from the source theme: a white card hairlined by 3px #F3F3F3 rules,
 * with a plus glyph that rotates into a minus as the row opens.
 */
export default function BlogFaq({ items }: { items: FaqEntry[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="mb-[50px] rounded-[9px] border-[3px] border-[#f3f3f3] bg-white">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={i > 0 ? "border-t-[3px] border-[#f3f3f3]" : undefined}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between px-4 py-6 text-left md:px-[42px]"
            >
              <h3
                className="text-[26px] font-bold leading-[1.2] text-black"
                dangerouslySetInnerHTML={{ __html: item.q }}
              />
              {/* Two 2px bars: the horizontal one fades and the pair rotates 90°,
                  so the plus turns into a minus exactly as the source does. */}
              <span
                aria-hidden="true"
                className={`relative ml-8 h-[18px] w-[18px] shrink-0 transition-transform duration-200 ease-out ${
                  isOpen ? "rotate-90" : ""
                }`}
              >
                <span
                  className={`absolute top-1/2 left-0 h-[2px] w-full -translate-y-1/2 bg-black transition-opacity duration-200 ease-out ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span className="absolute left-1/2 h-full w-[2px] -translate-x-1/2 bg-black" />
              </span>
            </button>

            <div
              className={`grid overflow-hidden px-4 transition-all duration-250 ease-out md:px-[42px] ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="mb-8">
                  {item.a.map((p, j) => (
                    <p
                      key={j}
                      className="mb-[15px] text-[18px] leading-[1.4] text-black last:mb-0"
                      dangerouslySetInnerHTML={{ __html: p.html }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
