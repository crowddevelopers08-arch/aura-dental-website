"use client";

import Image from "next/image";
import { useState } from "react";
import { COSMETIC_TREATMENTS, type CosmeticTreatment } from "@/data/services";

/**
 * Tab colours, in the order the treatments are listed. Presentation only, so it
 * lives here rather than in the content data.
 */
const TONES = ["#d3b871", "#cdc3b8", "#9db3a4", "#e2dad1", "#c8bcb0"];

/** Icon + title + copy + reasons, shared by the desktop panel and mobile card. */
function PanelBody({ t }: { t: CosmeticTreatment }) {
  return (
    <div className="max-w-[500px]">
      <div className="flex items-center gap-4">
        <span className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full border border-white/70">
          <Image src={t.icon} alt="" width={36} height={36} className="h-9 w-9 object-contain" />
        </span>
        <h3 className="text-[26px] font-bold leading-snug text-white">{t.title}</h3>
      </div>

      <p className="mt-6 text-[18px] leading-[1.4] text-white">{t.description}</p>

      <h4 className="mt-6 text-[18px] font-bold text-white">{t.whyHeading}</h4>
      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[18px] leading-[1.4] text-white marker:text-white">
        {t.reasons.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    </div>
  );
}

/** Photo backdrop plus the green wash that keeps the copy legible over it. */
function Backdrop({ image, solid = false }: { image: string; solid?: boolean }) {
  return (
    <>
      <Image src={image} alt="" fill sizes="(min-width: 1024px) 830px, 100vw" className="object-cover" />
      <span
        aria-hidden="true"
        className={`absolute inset-0 bg-gradient-to-r from-[#173727] via-[#173727]/85 ${
          solid ? "to-[#173727]/45" : "to-transparent"
        }`}
      />
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
    </>
  );
}

/** Extra section unique to the cosmetic dentistry page. */
export default function CosmeticTreatments() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-white px-5 py-[30px] md:py-[50px]">
      <div className="mx-auto max-w-[1240px]">
        <h2 className="text-[32px] font-bold leading-[1.3] text-black">
          Cosmetic Treatments Offered at Aura Dental
        </h2>

        {/* Desktop: one expanded panel, the rest collapsed to labelled tabs. */}
        <div className="mt-6 md:mt-10 hidden gap-4 lg:flex">
          {COSMETIC_TREATMENTS.map((t, i) => {
            const isActive = active === i;
            return (
              <div
                key={t.title}
                className={`relative h-[460px] overflow-hidden rounded-[14px] transition-all duration-500 ease-out ${
                  isActive ? "flex-1" : "w-[90px] shrink-0"
                }`}
                style={isActive ? undefined : { backgroundColor: TONES[i % TONES.length] }}
              >
                {isActive ? (
                  <>
                    <Backdrop image={t.image} />
                    <div className="relative flex h-full items-center p-6 md:p-12">
                      <PanelBody t={t} />
                    </div>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-label={`Show ${t.title}`}
                    className="flex h-full w-full cursor-pointer flex-col items-center px-2 py-7"
                  >
                    <Image
                      src={t.icon}
                      alt=""
                      width={38}
                      height={38}
                      className="h-[38px] w-[38px] shrink-0 object-contain"
                    />
                    <span className="mt-auto rotate-180 text-[14px] font-bold uppercase leading-tight tracking-[2px] text-white [writing-mode:vertical-rl]">
                      {t.title}
                    </span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Below lg the tabs have nowhere to go, so every treatment is a card. */}
        <div className="mt-6 md:mt-10 space-y-6 lg:hidden">
          {COSMETIC_TREATMENTS.map((t) => (
            <div
              key={t.title}
              className="relative overflow-hidden rounded-[14px] bg-[#173727]"
            >
              <Backdrop image={t.image} solid />
              <div className="relative p-6 md:p-8">
                <PanelBody t={t} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
