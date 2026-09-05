"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import VideoModal from "@/components/ui/VideoModal";
import type { ServicePage } from "@/data/services";
import { youtubeThumbnail } from "@/data/youtube";

export default function ServiceHero({ hero }: { hero: ServicePage["hero"] }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-gradient-to-b from-[#ddd5ca] to-white px-5 py-[30px] md:py-[70px]">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-6 md:gap-10 lg:grid-cols-[1.75fr_1fr_1.32fr] lg:gap-16">
        {/* Below lg this wrapper dissolves (`display: contents`), so the heading
            and the copy become grid items in their own right and the video can
            take the slot between them. From lg it is a plain block again — the
            original left column, untouched.
            align-desktop-left / align-mobile-center — the switch is at 768px */}
        <div className="contents lg:block">
          <div className="order-1 text-center md:text-left">
            <h1 className="text-[32px] font-semibold leading-[1.2] text-black md:text-[40px]">
              {hero.heading}
            </h1>
          </div>

          <div className="order-3 text-center md:text-left">
            {/* Stacked, the row gap already separates this from the video */}
            <p className="text-[20px] leading-[1.4] text-black lg:mt-4">{hero.subheading}</p>
          </div>

          <div className="order-5 text-center md:text-left">
            {/* Stacked, the row gap stands in for this margin — it only has to
                separate the CTA from the copy once the wrapper is a block. */}
            <div className="flex justify-center md:justify-start lg:mt-8">
              <Link
                href="#Book-Free-Consultation"
                className="rounded-[20px] bg-[#d3b871] px-5 py-2.5 text-[16px] font-semibold text-[#1d4231] transition-colors hover:bg-[#c9a95d]"
              >
                Book Your Free Consultation
              </Link>
            </div>

            <div className="mt-4 flex justify-center md:mt-6 md:justify-start">
              <a
                href="tel:+917842871414"
                className="inline-flex items-center gap-4 text-[18px] font-semibold text-[#1d4231] hover:underline"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1d4231]">
                  <Image
                    src="/images/footer-call.svg"
                    alt=""
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px]"
                  />
                </span>
                +91 7842871414
              </a>
            </div>
          </div>
        </div>

        {/* Patient video — second in the grid so it lands between the heading
            and the copy while the wrapper above is dissolved */}
        <div className="order-2 flex justify-center">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Play patient video testimonial"
            className="group relative block w-full max-w-[340px] overflow-hidden rounded-[20px] bg-black"
          >
            <Image
              src={youtubeThumbnail(hero.video)}
              alt="Patient video testimonial thumbnail"
              width={420}
              height={745}
              priority
              className="aspect-[9/16] w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
        </div>

        {/* Testimonial card + brand badge. Below md this wrapper dissolves too:
            the quote is dropped on phones and the badge slots in between the
            copy and the CTA. */}
        <div className="order-6 contents md:block">
          <figure className="hidden rounded-[16px] bg-white p-5 md:block md:p-7 text-left shadow-[0_2px_8px_rgba(0,0,0,0.04),0_12px_25px_rgba(0,0,0,0.07)]">
            <span
              aria-hidden="true"
              className="block font-heading text-[64px] font-bold leading-none text-[#1d4231]"
            >
              &ldquo;
            </span>
            <blockquote className="mt-4 text-[18px] leading-[1.4] text-[#333]">
              {hero.quote}
            </blockquote>
            <figcaption className="mt-5 text-[16px] font-bold uppercase tracking-wide text-[#111]">
              {hero.quoteAuthor}
            </figcaption>
          </figure>

          {hero.badge && (
            <div className="order-4 flex justify-center md:mt-10">
              <Image
                src={hero.badge}
                alt="invisalign-logo"
                width={300}
                height={72}
                className="h-auto w-full max-w-[300px] object-contain"
              />
            </div>
          )}
        </div>
      </div>

      <VideoModal src={open ? hero.video : null} onClose={() => setOpen(false)} />
    </section>
  );
}
