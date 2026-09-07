import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import AboutTreatments from "@/components/about/AboutTreatments";
import AwardsGallery from "@/components/about/AwardsGallery";
import CommitmentBand from "@/components/sections/CommitmentBand";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Aura Dental | Specialist Dental Clinic in Madinaguda, Hyderabad",
  description:
    "Aura Dental brings together advanced technology, modern techniques and a warm human touch. Led by Dr. Siva Nagini Yalavarthi, Implantologist and Prosthodontist.",
};

/** Small reusable copy + media band for the two sections on this page. */
function AboutBand({
  eyebrow,
  heading,
  copy,
  copyExtra,
  cta = false,
  media = "image",
  tone = "light",
}: {
  eyebrow: string;
  heading: string;
  copy: string;
  copyExtra?: string;
  cta?: boolean;
  /** "card" swaps the clinic still for the gold-glow statement card. */
  media?: "image" | "card";
  /** "dark" puts the band on the deep-green ground with reversed-out type. */
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  const headingColor = dark ? "text-white" : "text-black";
  const bodyColor = dark ? "text-white/90" : "text-[#444]";

  // `overflow-hidden` on the band: the statement card's halo is inset by -40px,
  // which reaches past the 20px page gutter and scrolls the whole page sideways
  // on a phone. Clipped at the band edge, the fade is imperceptible.
  return (
    <section className={`overflow-hidden px-5 py-8 ${dark ? "bg-[#1d4231]" : "bg-white"}`}>
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-6 md:gap-10 lg:grid-cols-2">
        {/* Below lg the wrapper dissolves (`display: contents`) so the media can
            sit between the heading and the copy; from lg it is the left column
            again. */}
        <div className="contents lg:block">
          <div className="order-1">
            <p className={`mb-1 text-center text-[18px] md:text-left ${headingColor}`}>{eyebrow}</p>
            <h2
              className={`text-center text-[32px] font-semibold leading-[1.3] md:text-left ${headingColor}`}
            >
              {heading}
            </h2>
          </div>

          <div className="order-3">
            {/* Centred on phones like the eyebrow, heading and CTA around them.
                Stacked, the row gap stands in for the top margin. */}
            <p
              className={`max-w-[560px] text-center text-[18px] leading-[1.4] md:text-left lg:mt-4 ${bodyColor}`}
            >
              {copy}
            </p>
            {copyExtra && (
              <p
                className={`mt-5 max-w-[560px] text-center text-[18px] leading-[1.4] md:text-left ${bodyColor}`}
              >
                {copyExtra}
              </p>
            )}
            {cta && (
              <div className="mt-5 md:mt-8 text-center md:text-left">
                <Button href="/contact">Book Your Free Consultation</Button>
              </div>
            )}
          </div>
        </div>

        {media === "card" ? (
          <div className="relative order-2">
            {/* Warm halo bleeding out from behind the card */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-10 bg-[radial-gradient(ellipse_at_center,rgba(211,184,113,0.55),rgba(211,184,113,0)_70%)] blur-2xl"
            />
            <p className="relative rounded-[14px] bg-white p-6 md:p-10 text-center font-heading text-[36px] font-bold leading-[1.2] text-black shadow-[0_2px_8px_rgba(0,0,0,0.04),0_12px_25px_rgba(0,0,0,0.07)] md:text-left md:text-[56px]">
              Bring out the <span className="text-[#d3b871]">Best Smile</span> Within You
            </p>
          </div>
        ) : (
          <div className="order-2 overflow-hidden rounded-[20px]">
            <Image
              src="/images/about-us.jpg"
              alt="Inside the Aura Dental clinic in Madinaguda, Hyderabad"
              width={1201}
              height={631}
              className="h-auto w-full"
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <PageHero
        title="Care begins with understanding"
        intro="Every smile tells a story of confidence, comfort, and care. At Aura Dental, we take time to listen before we treat, and to understand before we recommend."
        ctaLabel="Book Your Free Consultation"
        ctaHref="/contact"
      />

      <AboutBand
        eyebrow="Why Choose Aura Dental"
        heading="Designed for ease. Guided by trust."
        copy="Aura Dental brings together advanced technology, modern techniques, and a warm human touch."
        copyExtra="Every treatment begins with a clear understanding of your needs, supported by advanced diagnostics, modern technology, and a team with 12+ years of dental expertise that prioritizes your time and trust."
        media="card"
      />

      <AboutBand
        eyebrow="Our Facility"
        heading="Purpose-built spaces for every kind of care."
        copy="Designed as a modern clinical studio, Aura Dental houses advanced imaging systems, ergonomic dental units, and dedicated zones for hygiene, diagnostics, and treatment."
        cta
        tone="dark"
      />

      <AboutTreatments />
      <AwardsGallery />
      <CommitmentBand />
    </>
  );
}
