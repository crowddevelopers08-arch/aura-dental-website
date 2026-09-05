"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Options = {
  /** Milliseconds between auto-advances. 0 turns auto-scroll off. */
  interval?: number;
  /** Freeze the timer from the outside, e.g. while a lightbox is open. */
  paused?: boolean;
};

/**
 * Drives a scroll-snap track: arrow/dot navigation plus auto-scroll.
 *
 * Slide geometry stays in CSS (the track's direct children are the slides), so
 * a carousel can show one card on mobile and several from `sm` up without the
 * hook knowing the breakpoints — steps are measured from the live layout.
 */
export function useCarousel({ interval = 5000, paused = false }: Options = {}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  /** Hover, focus or touch: the visitor is reading, so hold the timer. */
  const [held, setHeld] = useState(false);
  const indexRef = useRef(0);

  const goTo = useCallback((i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.children[Math.max(0, Math.min(i, el.children.length - 1))];
    if (!slide) return;
    const left =
      el.scrollLeft + slide.getBoundingClientRect().left - el.getBoundingClientRect().left;
    el.scrollTo({ left, behavior: "smooth" });
  }, []);

  /* Wrap at the ends rather than dead-ending, so the auto-scroll keeps looping. */
  const next = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 2) {
      el.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    goTo(indexRef.current + 1);
  }, [goTo]);

  const prev = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    if (el.scrollLeft <= 2) {
      goTo(el.children.length - 1);
      return;
    }
    goTo(indexRef.current - 1);
  }, [goTo]);

  // Track position -> active dot. The active slide is whichever one sits
  // closest to the track's left edge.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const sync = () => {
      const base = el.getBoundingClientRect().left;
      let best = 0;
      let bestDist = Infinity;
      Array.from(el.children).forEach((slide, i) => {
        const dist = Math.abs(slide.getBoundingClientRect().left - base);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      indexRef.current = best;
      setIndex(best);
      setCount(el.children.length);
    };

    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  useEffect(() => {
    if (!interval || paused || held) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      // A background tab still fires intervals; advancing there would only
      // dump the visitor at a random slide when they come back.
      if (!document.hidden) next();
    }, interval);
    return () => window.clearInterval(id);
  }, [interval, paused, held, next]);

  /** Spread on the element wrapping the track and its arrows. */
  const holdProps = {
    onMouseEnter: () => setHeld(true),
    onMouseLeave: () => setHeld(false),
    onFocusCapture: () => setHeld(true),
    onBlurCapture: () => setHeld(false),
    onTouchStart: () => setHeld(true),
    onTouchEnd: () => setHeld(false),
  };

  return { trackRef, index, count, goTo, next, prev, holdProps };
}

type DotsProps = {
  count: number;
  index: number;
  onSelect: (i: number) => void;
  className?: string;
  /** Light dots for the dark-green sections. */
  tone?: "dark" | "light";
};

export function CarouselDots({ count, index, onSelect, className = "", tone = "dark" }: DotsProps) {
  if (count <= 1) return null;

  return (
    <div className={`flex justify-center gap-2 ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={`Go to slide ${i + 1}`}
          aria-current={i === index}
          className={`h-2 rounded-full transition-all duration-300 ${
            i === index ? "w-6" : "w-2"
          } ${
            tone === "light"
              ? i === index
                ? "bg-[#d3b871]"
                : "bg-white/40 hover:bg-white/70"
              : i === index
                ? "bg-[#1d4231]"
                : "bg-[#d2d2d2] hover:bg-[#b9b9b9]"
          }`}
        />
      ))}
    </div>
  );
}
