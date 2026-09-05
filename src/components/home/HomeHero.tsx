"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Card = {
  tag: string;
  heading: string;
  description: string;
  bullets: string[];
  ctaText: string;
  ctaHref: string;
  image: string;
  mobileImage: string;
};

/** The four expanding image panels in the hero (desktop only, as on the source). */
const CARDS: Card[] = [
  {
    tag: "Root Canal",
    heading: "Painless Treatment that Restores Your Peace.",
    description:
      "Relieve deep tooth pain and save your natural tooth with a calm, comfort-focused approach.",
    bullets: [
      "Advanced techniques for painless comfort.",
      "Care focused on lasting preservation.",
    ],
    ctaText: "Waiting till the next ache?",
    ctaHref: "/root-canal-treatment",
    image: "/images/root-canal.jpg",
    mobileImage: "/images/root-canal-mobile.jpg",
  },
  {
    tag: "Smile Transformation",
    heading: "Your Smile Crafted to Match Your Glow",
    description:
      "Get a beautifully balanced, camera-ready smile that elevates your confidence from every angle.",
    bullets: [
      "Aesthetic design that enhances naturally.",
      "Personalized plans for radiant results.",
    ],
    ctaText: "Waiting till the next ache?",
    ctaHref: "/cosmetic-dentistry",
    image: "/images/smile-transformation-1.jpg",
    mobileImage: "/images/smile-transformation-mobile.jpg",
  },
  {
    tag: "Aligners & Braces",
    heading: "Smile Designed to Elevate Your Presence",
    description:
      "Achieve natural, well-aligned teeth with discreet treatment that fits easily into your routine.",
    bullets: [
      "Precise planning for predictable alignment.",
      "Discreet treatment that fits lifestyle.",
    ],
    ctaText: "Waiting till the next ache?",
    ctaHref: "/aligners-and-braces",
    image: "/images/aligners-3.jpg",
    mobileImage: "/images/aligners-mobile.jpg",
  },
  {
    tag: "Kids Dentistry / Pediatric Dentistry",
    heading: "Gentle care for the bravest little hearts",
    description:
      "Helping your child build confident, cavity-free smiles with comfort they can trust.",
    bullets: [
      "Child-first comfortable and friendly guidance.",
      "Preventive, parent-inclusive dental care.",
    ],
    ctaText: "Waiting till the next ache?",
    ctaHref: "/kids-pediatric-dentistry",
    image: "/images/kids-dentistry.jpg",
    mobileImage: "/images/kids-dentistry-mobile.jpg",
  },
];

export default function HomeHero() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-gradient-to-b from-[#ddd5ca] to-white px-5 pb-[30px] md:pb-[50px] pt-[30px] md:pt-[50px]">
      <div className="mx-auto max-w-[1240px]">
        <h1 className="mx-auto mb-2.5 max-w-[1000px] text-center text-[32px] font-semibold leading-[1.2] text-black md:text-[40px]">
          Hyderabad&rsquo;s Trusted Dental Experts under One Roof
        </h1>

        <p className="mx-auto mb-[30px] max-w-[800px] text-center text-[20px] leading-[1.4] text-black">
          At Aura Dental, we combine gentle care with advanced technology to ensure every visit
          leaves your smile healthy, bright, and full of confidence.
        </p>

        {/* Google review badge */}
        <div className="flex justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2.5 rounded-full bg-white px-5 py-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
            <Image
              src="/images/google-g-logo.svg"
              alt="Google"
              width={22}
              height={22}
              className="h-[22px] w-[22px]"
            />
            <span className="whitespace-nowrap text-[16px] font-semibold leading-none text-[#163527]">
              837 Google Reviews
            </span>
            <span className="hidden h-4 w-px bg-[#d2d2d2] sm:block" />
            <span className="text-[18px] tracking-[-1px] text-[#fbbc04]">★★★★★</span>
            <span className="text-[18px] font-bold text-[#163527]">4.7/5</span>
          </div>
        </div>

        {/* Mobile: single lifestyle image + CTA (matches the source's mobile-only widgets) */}
        <div className="mt-5 md:mt-8 md:hidden">
          <Image
            src="/images/close-up-boy-playing-kids-park.jpg"
            alt="close-up-boy-playing-kids-park"
            width={1200}
            height={800}
            priority
            className="h-auto w-full rounded-[20px] object-cover"
          />
          <div className="mt-6 flex justify-center">
            <Link
              href="/contact"
              className="rounded-[20px] bg-[#d3b871] px-5 py-2.5 text-[16px] font-semibold text-[#1d4231]"
            >
              Book Your Free Consultation
            </Link>
          </div>
        </div>

        {/* Desktop: expanding panels */}
        <div className="mt-6 md:mt-10 hidden gap-3 md:flex" role="list">
          {CARDS.map((card, i) => {
            const isActive = active === i;
            return (
              <div
                key={card.tag}
                role="listitem"
                tabIndex={0}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`relative h-[460px] cursor-pointer overflow-hidden rounded-[20px] transition-all duration-500 ease-out ${
                  isActive ? "flex-[3.2]" : "flex-[1]"
                }`}
              >
                <Image
                  src={card.image}
                  alt={card.tag}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1240px) 60vw, 720px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                {/* Collapsed label */}
                <div
                  className={`absolute bottom-6 left-1/2 -translate-x-1/2 transition-opacity duration-300 ${
                    isActive ? "pointer-events-none opacity-0" : "opacity-100"
                  }`}
                >
                  <span className="block whitespace-nowrap text-[15px] font-semibold text-white [writing-mode:vertical-rl] [text-orientation:mixed]">
                    {card.tag}
                  </span>
                </div>

                {/* Expanded content */}
                <div
                  className={`absolute inset-x-0 bottom-0 p-6 transition-all duration-500 ${
                    isActive
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-4 opacity-0"
                  }`}
                >
                  <span className="inline-block rounded-full bg-[#d3b871] px-3.5 py-1 text-[13px] font-semibold text-[#1d4231]">
                    {card.tag}
                  </span>
                  {/* Panel type follows `.dcb-center-desc` (15px) and `.hero-split` */}
                  <h2 className="mt-3 max-w-[520px] text-[32px] font-bold leading-[34px] text-white">
                    {card.heading}
                  </h2>
                  <p className="mt-2 max-w-[520px] text-[15px] leading-[1.5] text-white/90">
                    {card.description}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {card.bullets.map((b) => (
                      <li
                        key={b}
                        className="bg-[url('/images/list1.svg')] bg-position-[left_6px] bg-no-repeat pl-[25px] text-[15px] leading-[1.5] text-white/90"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <span className="text-[15px] font-semibold text-white">{card.ctaText}</span>
                    <Link
                      href={card.ctaHref}
                      className="rounded-[20px] bg-[#d3b871] px-5 py-2 text-[16px] font-semibold text-[#1d4231] transition-colors hover:bg-[#c9a95d]"
                    >
                      Book an Appointment
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
