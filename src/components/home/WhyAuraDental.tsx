import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";

const BENEFITS = [
  {
    icon: "/images/painless-treatment.svg",
    title: "Painless Treatments",
    description:
      "Experience gentle dentistry with advanced anesthesia and precision technology. From simple fillings to complex procedures, your comfort comes first, always.",
  },
  {
    icon: "/images/hygienic-dental-space.svg",
    title: "Hygienic Dental Space",
    description:
      "Our patients, from working professionals to families, choose Aura for the safe, clean, and sterile environment.",
  },
  {
    icon: "/images/quick-convenient-care.svg",
    title: "Quick Convenient Care",
    description:
      "Get expert dental treatments right when you need them. From walk-ins to same-day consultations for urgent care, we make your dental visits fast, easy, and stress-free.",
  },
  {
    icon: "/images/luxury.svg",
    title: "Experience Luxury in Dentistry",
    description:
      "Step into a comfortable dental clinic that blends advanced technology with comfort, privacy, and personalized care.",
  },
];

/**
 * Desktop placement: two benefits down the left column, two down the right, with
 * the brand film filling the middle. Explicit cell coordinates (rather than DOM
 * order) keep the film after the benefits in the markup; on mobile it is ordered
 * first so it sits between the heading and the benefit copy.
 */
const CELLS = [
  "md:col-start-1 md:row-start-1",
  "md:col-start-1 md:row-start-2",
  "md:col-start-3 md:row-start-1",
  "md:col-start-3 md:row-start-2",
];

export default function WhyAuraDental() {
  return (
    <section className="bg-white px-5 py-[30px] md:py-[50px]">
      <div className="mx-auto max-w-[1240px]">
        <SectionLabel icon="/images/aura-dental-happy-teeth.svg" label="Why Aura Dental" />

        <h2 className="mt-4 text-center text-[32px] font-bold leading-[1.3] text-black">
          Experience the Aura of Care
        </h2>

        <div className="mt-6 md:mt-10 grid grid-cols-1 gap-x-16 gap-y-8 md:gap-y-12 md:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <div key={b.title} className={CELLS[i]}>
              <div className="flex items-center gap-5">
                <Image
                  src={b.icon}
                  alt={b.title}
                  width={40}
                  height={40}
                  className="h-10 w-10 shrink-0"
                />
                <h4 className="text-[24px] font-semibold leading-snug text-[#1d4231]">
                  {b.title}
                </h4>
              </div>
              <p className="mt-3 text-[18px] leading-[1.4] text-[#444]">{b.description}</p>
            </div>
          ))}

          {/* Brand still. 1201x631 native, so it keeps its own aspect in the column. */}
          <div className="order-first md:order-none md:col-start-2 md:row-start-1 md:row-span-2 md:self-center">
            <Image
              src="/images/home.jpg"
              alt="Dentist treating a relaxed patient at Aura Dental"
              width={1201}
              height={631}
              className="h-auto w-full rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
