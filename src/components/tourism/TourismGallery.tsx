"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const TREATMENTS = [
  { src: "/images/implants-1.jpg", label: "Dental Implants" },
  { src: "/images/cosmetic-dentistry.jpg", label: "Cosmetic Dentistry" },
  { src: "/images/veneers.jpg", label: "Veneers" },
  { src: "/images/teeth-whitening.jpg", label: "Teeth Whitening" },
  { src: "/images/root-canal-1.jpg", label: "Root Canals" },
  { src: "/images/crowns-bridges-1.jpg", label: "Crowns & Bridges" },
  { src: "/images/aligners-1.jpg", label: "Aligners & Braces" },
  { src: "/images/pediatric-dentistry.jpg", label: "Kids Dentistry" },
];

/** Lightbox gallery of popular NRI treatments. */
export default function TourismGallery() {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setIndex((i) => (i === null ? i : (i + dir + TREATMENTS.length) % TREATMENTS.length)),
    []
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, step]);

  return (
    <section className="bg-white px-5 py-6 md:py-10">
      <div className="mx-auto max-w-[1240px]">
        <h2 className="text-center text-[32px] font-bold leading-[1.3] text-black md:text-left">
          Popular Treatments for NRIs &amp; International Patients
        </h2>

        {/* Kept compact so both rows and the heading clear a laptop viewport */}
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {TREATMENTS.map((t, i) => (
            <button
              key={t.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Open ${t.label} image`}
              className="group block"
            >
              <span className="block overflow-hidden rounded-[18px] bg-black">
                <Image
                  src={t.src}
                  alt={t.label}
                  width={400}
                  height={300}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </span>
              <span className="mt-3 block text-center text-[16px] font-bold text-black">
                {t.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {index !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={TREATMENTS[index].label}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-3xl leading-none text-white hover:bg-white/30"
          >
            ×
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous image"
            className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-2xl text-white hover:bg-white/30"
          >
            ❮
          </button>
          <figure onClick={(e) => e.stopPropagation()} className="max-w-[90vw]">
            <Image
              src={TREATMENTS[index].src}
              alt={TREATMENTS[index].label}
              width={1000}
              height={750}
              className="max-h-[80vh] w-auto rounded-[16px] object-contain"
            />
            <figcaption className="mt-3 text-center text-[16px] text-white">
              {TREATMENTS[index].label}
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next image"
            className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-2xl text-white hover:bg-white/30"
          >
            ❯
          </button>
        </div>
      )}
    </section>
  );
}
