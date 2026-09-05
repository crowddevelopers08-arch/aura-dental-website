"use client";

import Image from "next/image";
import { useState } from "react";
import VideoModal from "@/components/ui/VideoModal";
import { CarouselDots, useCarousel } from "@/components/ui/Carousel";
import SectionLabel from "@/components/ui/SectionLabel";
import { VIDEO_TESTIMONIALS, type VideoTestimonial } from "@/data/testimonials";

type Props = {
  items?: VideoTestimonial[];
  heading?: string;
  intro?: string;
  /**
   * Eyebrow + heading + intro. Off on /patient-testimonials, where the page
   * hero already introduces the videos.
   */
  showHeader?: boolean;
  /** Carousel on the home/service pages, plain grid on /patient-testimonials. */
  layout?: "carousel" | "grid";
};

export default function VideoTestimonials({
  items = VIDEO_TESTIMONIALS,
  heading = "Where Every Smile Tells a Story",
  intro = "From life-changing implant restorations to confident cosmetic makeovers, hear from patients directly!",
  showHeader = true,
  layout = "carousel",
}: Props) {
  const [active, setActive] = useState<string | null>(null);
  // The modal covers the track, so hold the auto-scroll while a video plays.
  const { trackRef, index, count, goTo, next, prev, holdProps } = useCarousel({
    interval: layout === "carousel" ? 5000 : 0,
    paused: active !== null,
  });

  const card = (t: VideoTestimonial) => (
    <button
      type="button"
      onClick={() => setActive(t.video)}
      aria-label={`Play video testimonial from ${t.name}`}
      className="group relative block w-full overflow-hidden rounded-[20px] bg-black"
    >
      <Image
        src={t.thumbnail}
        alt={`${t.name} — Aura Dental patient feedback`}
        width={420}
        height={745}
        className="aspect-[9/16] h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/25">
        <Image
          src="/images/youtube-icon.svg"
          alt="Play"
          width={56}
          height={56}
          className="h-14 w-14 drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
        />
      </span>
    </button>
  );

  // Without a header there's nothing to separate from the section above, so the
  // top padding comes down to the hero's own trailing space.
  return (
    <section className={`bg-white px-5 pb-[30px] md:pb-[50px] ${showHeader ? "pt-[30px] md:pt-[50px]" : "pt-6"}`}>
      <div className="mx-auto max-w-[1240px]">
        {/* Source eyebrow is "Success Stories", left-aligned from 768px up */}
        {showHeader && (
          <>
            <SectionLabel icon="/images/testimonial.svg" label="Success Stories" align="left" />
            <h2 className="mt-4 text-center text-[32px] font-bold leading-[1.3] text-black md:text-left">
              {heading}
            </h2>
            {intro && (
              <p className="mt-4 max-w-[800px] text-center text-[18px] leading-[1.4] text-[#444] md:text-left">
                {intro}
              </p>
            )}
          </>
        )}

        {layout === "grid" ? (
          <div
            className={`grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 ${
              showHeader ? "mt-6 md:mt-10" : ""
            }`}
          >
            {items.map((t) => (
              <div key={t.name}>{card(t)}</div>
            ))}
          </div>
        ) : (
          <div className="relative mt-6 md:mt-10" {...holdProps}>
            <div
              ref={trackRef}
              className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
            >
              {/* One slide fills the track on mobile; the card inside stays
                  capped, so a 9:16 thumbnail doesn't run the full page height
                  and the arrows keep a gutter to sit in. */}
              {items.map((t) => (
                <div key={t.name} className="w-full shrink-0 snap-start sm:w-[260px]">
                  <div className="mx-auto w-full max-w-[240px] sm:max-w-none">{card(t)}</div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonials"
              className="absolute -left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#1d4231] text-white shadow-lg transition-colors hover:bg-[#163527]"
            >
              ❮
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonials"
              className="absolute -right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#1d4231] text-white shadow-lg transition-colors hover:bg-[#163527]"
            >
              ❯
            </button>

            <CarouselDots count={count} index={index} onSelect={goTo} className="mt-5" />
          </div>
        )}
      </div>

      <VideoModal src={active} onClose={() => setActive(null)} />
    </section>
  );
}
