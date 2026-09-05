"use client";

import Image from "next/image";
import Link from "next/link";
import { CarouselDots, useCarousel } from "@/components/ui/Carousel";

const TREATMENTS = [
  {
    title: "Pediatric Dentistry",
    image: "/images/pediatric-dentistry.jpg",
    description: "Gentle, reassuring care that helps children build comfort with the dentist.",
    href: "/kids-pediatric-dentistry",
  },
  {
    title: "Braces",
    image: "/images/braces-1.jpg",
    description: "For teens and adults who want a straighter smile and lasting confidence.",
    href: "/aligners-and-braces",
  },
  {
    title: "Aligners",
    image: "/images/aligners-1.jpg",
    description: "Designed for professionals & teens seeking discreet, flexible teeth alignment.",
    href: "/aligners-and-braces",
  },
  {
    title: "Implants",
    image: "/images/implants-1.jpg",
    description:
      "Ideal for adults seeking a permanent, natural-looking solution to replace missing teeth.",
    href: "/dental-implants",
  },
  {
    title: "Cosmetic Dentistry",
    image: "/images/cosmetic-dentistry.jpg",
    description:
      "Tailored for those looking to enhance their smile's appearance with precision and artistry.",
    href: "/cosmetic-dentistry",
  },
  {
    title: "Root Canal",
    image: "/images/root-canal-1.jpg",
    description: "For those wanting to save their natural tooth with a painless, modern approach.",
    href: "/root-canal-treatment",
  },
];

function Arrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-[#1d4231] stroke-2">
      <path
        d={dir === "prev" ? "M15 5 8 12l7 7" : "M9 5l7 7-7 7"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AboutTreatments() {
  const { trackRef, index, count, goTo, next, prev, holdProps } = useCarousel();

  return (
    <section className="bg-white px-5 py-[30px] md:py-[50px]">
      <div className="mx-auto max-w-[1240px]" {...holdProps}>
        {/* Stacked and centred on phones, heading-left/arrows-right from md */}
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <h2 className="text-center text-[32px] font-bold leading-[1.3] text-black md:text-left">
            Our Treatments
          </h2>

          {/* Arrows, since the track's scrollbar is hidden */}
          <div className="flex shrink-0 gap-2">
            {([-1, 1] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={dir === -1 ? prev : next}
                aria-label={dir === -1 ? "Previous treatments" : "Next treatments"}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d2d2d2] bg-white transition-colors hover:bg-[#ececec]"
              >
                <Arrow dir={dir === -1 ? "prev" : "next"} />
              </button>
            ))}
          </div>
        </div>

        {/* One card per view on mobile, then the source's 300px track */}
        <div
          ref={trackRef}
          className="no-scrollbar mt-5 md:mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2"
        >
          {TREATMENTS.map((t) => (
            <article
              key={t.title}
              className="flex w-full shrink-0 snap-start flex-col rounded-[10px] bg-[#ececec] p-6 md:p-8 text-center sm:w-[300px]"
            >
              <h3 className="text-[22px] font-bold leading-snug text-black">{t.title}</h3>

              <Image
                src={t.image}
                alt={t.title}
                width={400}
                height={300}
                className="mt-4 aspect-[4/3] w-full rounded-[8px] object-cover"
              />

              <p className="mt-4 flex-1 text-[16px] leading-[1.4] text-[#444]">{t.description}</p>

              <Link
                href={t.href}
                className="mt-6 block rounded-[8px] bg-[#d3b871] px-5 py-3 text-[16px] font-semibold text-[#1d4231] transition-colors hover:bg-[#c9a95d]"
              >
                Read More
              </Link>
            </article>
          ))}
        </div>

        <CarouselDots count={count} index={index} onSelect={goTo} className="mt-4" />
      </div>
    </section>
  );
}
