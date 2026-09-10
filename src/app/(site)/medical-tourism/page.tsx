import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import TourismWhyChoose from "@/components/tourism/TourismWhyChoose";
import TourismGallery from "@/components/tourism/TourismGallery";
import ServiceFaq from "@/components/services/ServiceFaq";
import VideoTestimonials from "@/components/sections/VideoTestimonials";
import Button from "@/components/ui/Button";
import CommitmentBand from "@/components/sections/CommitmentBand";
import type { FaqItem } from "@/data/services";

export const metadata: Metadata = {
  title: "Medical Tourism in Hyderabad for NRIs & International Patients | Aura Dental",
  description:
    "World-class dental care made easy for NRIs, expats and international visitors to Hyderabad. Online consultations before you fly, treatment planned around your travel dates.",
};

const FAQS: FaqItem[] = [
  {
    question: "Can I finish my treatment during a short trip?",
    answer:
      "Yes, we plan everything around your itinerary so your treatment fits comfortably within your travel dates.",
  },
  {
    question: "Do you offer online consultations?",
    answer:
      "Of course. Most of our NRI patients begin with a simple video call to discuss their smile goals and timelines.",
  },
  {
    question: "Will I feel comfortable and safe at the clinic?",
    answer:
      "Absolutely. Aura Dental is designed to feel warm, hygienic, and modern — ideal for families and international visitors.",
  },
  {
    question: "Do your treatments match international quality?",
    answer:
      "Yes. Whether it's implants, crowns, or cosmetic work, we use premium materials trusted worldwide.",
  },
  {
    question: "How will follow-up happen once I go back abroad?",
    answer: "We continue all follow-ups online, ensuring you feel supported long after your trip ends.",
  },
];

const DIFFERENTIATORS = [
  {
    title: "Personal Care, Start to Finish",
    description:
      "From your first video call to your final in-clinic visit, our team guides you personally through every step.",
  },
  {
    title: "Online Consultation Before You Fly",
    description:
      "We help you understand your smile goals, treatment options, and timelines all from your home abroad.",
  },
  {
    title: "Timely Treatment, Thoughtfully Planned",
    description:
      "Whether it’s implants, crowns, cosmetic work, or a general check-up, everything is timed to fit your stay.",
  },
  {
    title: "Quality That Feels Global",
    description:
      "From materials to comfort standards, every detail is chosen to match international expectations.",
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        title="Medical Tourism at Aura Dental"
        intro="World-class dental care made easy, comfortable, and beautifully planned for every NRI, expat, and international visitor coming to Hyderabad."
        ctaLabel="Book Your Free Consultation"
        ctaHref="/contact"
      >
        <p className="mt-6 text-center text-[20px] leading-[1.4] text-black">
          Your smile is taken care of the moment you land.
        </p>
      </PageHero>

      <TourismWhyChoose />

      {/* Hygienic clinic band */}
      <section className="bg-[#1d4231] px-5 py-[30px] md:py-[50px]">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-6 md:gap-10 lg:grid-cols-2">
          {/* Below lg the wrapper dissolves (`display: contents`) so the video
              can sit between the heading and the copy; from lg it is the left
              column again. */}
          <div className="contents lg:block">
            <h2 className="order-1 text-center text-[32px] font-bold leading-[1.3] text-white md:text-left">
              A Hygienic, High-Standard Clinic You Can Trust
            </h2>

            <div className="order-3">
              {/* Stacked, the row gap already separates this from the video */}
              <p className="text-center text-[18px] leading-[1.4] text-white/90 md:text-left lg:mt-4">
                A modern, fully equipped clinic designed to make patients feel comfortable. Advanced
                technology, strict global-standard sterilization, and a calm, relaxing environment
                that makes your treatment feel effortless from arrival to finish.
              </p>
              <div className="mt-5 md:mt-8 text-center md:text-left">
                <Button href="/contact">Book Your Free Consultation</Button>
              </div>
            </div>
          </div>

          {/* Same clinic still the About Us page uses */}
          <div className="order-2 overflow-hidden rounded-[20px]">
            <Image
              src="/images/about-us.jpg"
              alt="Inside the Aura Dental clinic in Madinaguda, Hyderabad"
              width={1201}
              height={631}
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      <TourismGallery />

      {/* What makes the programme different */}
      <section className="bg-white px-5 py-[30px] md:py-[50px]">
        <div className="mx-auto max-w-[1240px]">
          {/* align-desktop-center on the source, unlike the other section headings */}
          <h2 className="text-center text-[32px] font-bold leading-[1.3] text-black">
            What Makes Aura&rsquo;s Medical Tourism Program Different?
          </h2>

          <div className="mt-6 md:mt-10 grid grid-cols-1 items-center gap-6 md:gap-10 lg:grid-cols-2">
            <Image
              src="/images/medical-tourism.jpg"
              alt="Medical tourism at Aura Dental"
              width={620}
              height={460}
              className="h-auto w-full rounded-[20px] object-cover"
            />

            <ul className="space-y-5">
              {DIFFERENTIATORS.map((d) => (
                <li
                  key={d.title}
                  className="bg-[url('/images/list1.svg')] bg-position-[left_6px] bg-no-repeat pl-[25px]"
                >
                  <strong className="block text-[18px] font-bold leading-relaxed text-black">
                    {d.title}
                  </strong>
                  <p className="text-[18px] leading-[1.4] text-[#444]">{d.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Same slot the treatment pages give it: after "what makes us
          different", ahead of the FAQs */}
      <VideoTestimonials />

      <ServiceFaq items={FAQS} />
      <CommitmentBand />
    </>
  );
}
