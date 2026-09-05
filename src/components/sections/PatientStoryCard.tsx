"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { PatientStory } from "@/data/patientStories";

/**
 * Before/after flip card used on the homepage "Treatments we Offer" carousel
 * and on the /patient-stories grid. The arrow at the top-left toggles the two
 * images; its `aria-label` carries the state, since the card shows no badge.
 */
export default function PatientStoryCard({ story }: { story: PatientStory }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04),0_12px_25px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08),0_25px_50px_rgba(0,0,0,0.12)]">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#f6f6f7]">
        <Image
          src={flipped ? story.after : story.before}
          alt={`${story.title} — ${flipped ? "after" : "before"} treatment`}
          fill
          sizes="(max-width: 768px) 90vw, 400px"
          className="object-cover transition-opacity duration-300"
        />
        <button
          type="button"
          onClick={() => setFlipped((v) => !v)}
          aria-label={`Show ${flipped ? "before" : "after"} image for ${story.title}`}
          className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-[8px] bg-[#d3b871] shadow-md transition-transform duration-300 hover:scale-110"
        >
          <Image src="/images/back.svg" alt="" width={20} height={20} className="h-5 w-5" />
        </button>
      </div>

      {/* `.card-content` — h3 26px, p #555, and a gold pill CTA (not a text link) */}
      <div className="flex flex-1 flex-col px-5 py-6 text-center">
        <h3 className="mb-2.5 text-[26px] font-bold leading-snug text-[#1d4231]">{story.title}</h3>
        <p className="mb-[15px] flex-1 text-[18px] leading-[1.4] text-[#555]">
          {story.description}
        </p>
        <Link
          href={story.href}
          className="mt-[13px] inline-block self-center rounded-[20px] bg-[#d3b871] px-5 py-2 text-[16px] font-semibold text-[#1d4231] transition-colors hover:bg-[#c9a95d]"
        >
          Learn More
        </Link>
      </div>
    </article>
  );
}
