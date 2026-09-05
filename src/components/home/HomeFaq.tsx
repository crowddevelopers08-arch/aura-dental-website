import Accordion from "@/components/ui/Accordion";
import SectionLabel from "@/components/ui/SectionLabel";
import type { FaqItem } from "@/data/services";

const FAQS: FaqItem[] = [
  {
    question: "How often should I visit the dentist?",
    answer:
      "Most people benefit from a dental check-up every six months. Regular visits help catch issues early and keep your teeth healthy and strong.",
  },
  {
    question: "Are teeth cleaning necessary even if I brush regularly?",
    answer:
      "Yes, daily brushing and flossing are essential, but professional cleaning remove tartar and plaque that your brushes often miss out on. Our hygiene sessions at Aura Dental are gentle, and precise, leaving your teeth and mouth clean and refreshed.",
  },
  {
    question: "What can I do if I'm unhappy with my smile?",
    answer:
      "Whether it's discoloration, uneven teeth, or spacing, modern cosmetic dentistry offers many subtle ways to enhance your smile. At Aura Dental, we combine aesthetic precision with natural-looking results that reflect your personality and natural smile!",
  },
];

export default function HomeFaq() {
  return (
    <section className="bg-white px-5 py-[30px] md:py-[50px]">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-6 md:gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Left rail */}
        <div>
          <SectionLabel
            icon="/images/faq-costumer-service-1.svg"
            label="FAQ"
            align="left"
            size={45}
          />

          <h2 className="mt-4 text-center text-[32px] font-bold leading-[1.3] text-black md:text-left">
            Everything You Need to Know About Dental Care
          </h2>

          <p className="mt-4 text-[18px] leading-[1.4] text-[#444]">
            Great care begins with honest conversations. Here are some of the most common questions
            we hear from our patients.
          </p>
        </div>

        {/* Accordion */}
        <div>
          <Accordion items={FAQS} tone="light" />
        </div>
      </div>
    </section>
  );
}
