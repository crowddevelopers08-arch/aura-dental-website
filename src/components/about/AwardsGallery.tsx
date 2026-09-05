"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const CERTIFICATES = Array.from(
  { length: 8 },
  (_, i) => `/images/certificates-0${i + 1}.jpg`
);

/** Listed twice so the -50% keyframe lands on an identical frame. */
const TRACK = [...CERTIFICATES, ...CERTIFICATES];

export default function AwardsGallery() {
  /** Index into CERTIFICATES of the open slide, or null when closed. */
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((i) => (i === null ? i : (i + dir + CERTIFICATES.length) % CERTIFICATES.length)),
    []
  );

  useEffect(() => {
    if (open === null) return;
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
  }, [open, close, step]);

  return (
    <section className="bg-[#1d4231] py-[30px] md:py-[50px]">
      <div className="mx-auto max-w-[1240px] px-5">
        <h2 className="text-center text-[32px] font-bold leading-[1.3] text-white md:text-left">
          Award and Certificates
        </h2>
      </div>

      {/* Full-bleed marquee; hovering pauses it so a certificate can be clicked */}
      <div className="marquee-viewport group relative mt-5 md:mt-8 overflow-hidden">
        <div className="animate-marquee flex w-max gap-6 group-hover:[animation-play-state:paused]">
          {TRACK.map((src, i) => {
            const n = (i % CERTIFICATES.length) + 1;
            return (
              <button
                key={`${src}-${i}`}
                type="button"
                onClick={() => setOpen(i % CERTIFICATES.length)}
                // The second pass is the same eight images, so keep it out of
                // the accessibility tree rather than announcing duplicates.
                aria-hidden={i >= CERTIFICATES.length}
                tabIndex={i >= CERTIFICATES.length ? -1 : 0}
                aria-label={`View certificate ${n}`}
                className="w-[300px] shrink-0 rounded-[10px] bg-[#d3b871] p-2 transition-transform duration-300 hover:scale-[1.04]"
              >
                <Image
                  src={src}
                  alt={`Certificates-0${n}`}
                  width={400}
                  height={300}
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-[6px] object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`Certificate ${open + 1} of ${CERTIFICATES.length}`}
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
            aria-label="Previous certificate"
            className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-2xl text-white hover:bg-white/30"
          >
            ❮
          </button>

          <figure onClick={(e) => e.stopPropagation()} className="max-w-[92vw]">
            <Image
              src={CERTIFICATES[open]}
              alt={`Certificates-0${open + 1}`}
              width={1200}
              height={900}
              className="max-h-[80vh] w-auto rounded-[12px] object-contain"
            />
            <figcaption className="mt-3 text-center text-[16px] text-white/80">
              {open + 1} / {CERTIFICATES.length}
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next certificate"
            className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-2xl text-white hover:bg-white/30"
          >
            ❯
          </button>
        </div>
      )}
    </section>
  );
}
