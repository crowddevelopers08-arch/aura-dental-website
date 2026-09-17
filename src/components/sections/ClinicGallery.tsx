"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { CLINIC_PHOTOS, type GalleryPhoto } from "@/data/galleryPhotos";

/** Lightbox photo gallery; shows the clinic interiors unless given `photos`. */
export default function ClinicGallery({
  heading = "Take a Look Inside Aura Dental",
  tone = "light",
  photos = CLINIC_PHOTOS,
  captions = true,
}: {
  heading?: string;
  /** "dark" puts the section on the deep-green ground with reversed-out type. */
  tone?: "light" | "dark";
  photos?: GalleryPhoto[];
  /** false hides the label overlaid on each thumbnail. */
  captions?: boolean;
}) {
  const PHOTOS = photos;
  const [index, setIndex] = useState<number | null>(null);
  const dark = tone === "dark";
  // Five photos in rows of three would leave a short last row, so on desktop
  // the first two share the top row and the rest fill rows of three below.
  const wide = PHOTOS.length % 3 === 2;

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setIndex((i) => (i === null ? i : (i + dir + PHOTOS.length) % PHOTOS.length)),
    [PHOTOS.length]
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
    <section className={`px-5 py-[30px] md:py-[50px] ${dark ? "bg-[#1d4231]" : "bg-white"}`}>
      <div className="mx-auto max-w-[1240px]">
        <h2
          className={`text-center text-[32px] font-bold leading-[1.3] ${dark ? "text-white" : "text-black"}`}
        >
          {heading}
        </h2>

        {/* Odd counts: on the two-column phone grid the first photo spans both
            columns so the rest pair up evenly. */}
        <div
          className={`mt-6 grid grid-cols-2 gap-3 md:mt-10 md:gap-5 ${wide ? "md:grid-cols-6" : "md:grid-cols-3"}`}
        >
          {PHOTOS.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Open ${p.label} photo`}
              className={`group relative block overflow-hidden rounded-[16px] bg-black ${
                i === 0 && PHOTOS.length % 2 === 1 ? "col-span-2" : "col-span-1"
              } ${wide ? (i < 2 ? "md:col-span-3" : "md:col-span-2") : "md:col-span-1"}`}
            >
              <Image
                src={p.src}
                alt={`${p.label} at Aura Dental, Madinaguda`}
                width={768}
                height={512}
                sizes={`(min-width: 768px) ${wide && i < 2 ? "620px" : "400px"}, ${
                  i === 0 && PHOTOS.length % 2 === 1 ? "100vw" : "50vw"
                }`}
                className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {captions && (
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent px-3 pb-2 pt-8 text-left text-[14px] font-semibold text-white md:text-[16px]">
                  {p.label}
                </span>
              )}
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
          aria-label={PHOTOS[index].label}
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
            aria-label="Previous photo"
            className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-2xl text-white hover:bg-white/30"
          >
            ❮
          </button>
          <figure onClick={(e) => e.stopPropagation()} className="max-w-[92vw]">
            <Image
              src={PHOTOS[index].src}
              alt={`${PHOTOS[index].label} at Aura Dental, Madinaguda`}
              width={1536}
              height={1024}
              className="max-h-[80vh] w-auto rounded-[16px] object-contain"
            />
            <figcaption className="mt-3 text-center text-[16px] text-white">
              {PHOTOS[index].label} &middot; {index + 1} / {PHOTOS.length}
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next photo"
            className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-2xl text-white hover:bg-white/30"
          >
            ❯
          </button>
        </div>
      )}
    </section>
  );
}
