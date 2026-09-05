import ServiceHero from "./ServiceHero";
import ServiceBookingSection from "./ServiceBookingSection";
import WhyChooseSection from "./WhyChooseSection";
import WhatMakesDifferent from "./WhatMakesDifferent";
import ServiceFaq from "./ServiceFaq";
import VideoTestimonials from "@/components/sections/VideoTestimonials";
import NeedHelpCta from "@/components/sections/NeedHelpCta";
import type { ServicePage } from "@/data/services";

type Props = {
  service: ServicePage;
  /** Extra sections injected between "what makes us different" and the testimonials. */
  children?: React.ReactNode;
};

/** Shared shape for the five treatment pages (aligners, implants, RCT, kids, cosmetic). */
export default function ServicePageTemplate({ service, children }: Props) {
  return (
    <>
      <ServiceHero hero={service.hero} />
      <ServiceBookingSection />
      <WhyChooseSection data={service.whyChoose} />
      <WhatMakesDifferent data={service.different} />
      {children}
      <VideoTestimonials />
      <ServiceFaq items={service.faqs} />
      <NeedHelpCta subheading={service.needHelp} />
    </>
  );
}
