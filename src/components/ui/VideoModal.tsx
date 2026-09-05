"use client";

import { useEffect } from "react";

type Props = {
  /** YouTube video id, or null when the lightbox is closed. */
  src: string | null;
  onClose: () => void;
};

/** Lightbox used by every video-testimonial carousel on the site. */
export default function VideoModal({ src, onClose }: Props) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [src, onClose]);

  if (!src) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Patient video testimonial"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close video"
        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-3xl leading-none text-white transition-colors hover:bg-white/30"
      >
        ×
      </button>
      {/* Shorts are 9:16: cap the width to that ratio on a tall screen, and let
          the player letterbox itself once the viewport is the narrower side.
          The click guard sits on the wrapper — a cross-origin iframe can't
          bubble one out. */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-[85vh] w-full max-w-[calc(85vh*9/16)] overflow-hidden rounded-[20px] bg-black shadow-2xl"
      >
        <iframe
          key={src}
          src={`https://www.youtube-nocookie.com/embed/${src}?autoplay=1&rel=0&playsinline=1`}
          title="Patient video testimonial"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
    </div>
  );
}
