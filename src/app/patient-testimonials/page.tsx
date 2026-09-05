import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import VideoTestimonials from "@/components/sections/VideoTestimonials";
import { TESTIMONIALS_PAGE_ORDER } from "@/data/testimonials";

export const metadata: Metadata = {
  title: "Patient Testimonials | Aura Dental Hyderabad",
  description:
    "Hear directly from Aura Dental patients about implants, aligners, root canals and smile makeovers at our Madinaguda and Kondapur clinics.",
};

export default function Page() {
  return (
    <>
      <PageHero
        title="Patient Testimonials"
        intro={
          "At Aura, we value trust, comfort, and clarity.\n" +
          "Hear directly from the people who’ve experienced dental care with us."
        }
      />


      <VideoTestimonials items={TESTIMONIALS_PAGE_ORDER} layout="grid" showHeader={false} />
    </>
  );
}
