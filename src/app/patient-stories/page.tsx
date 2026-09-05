import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import PatientStoryCard from "@/components/sections/PatientStoryCard";
import NeedHelpCta from "@/components/sections/NeedHelpCta";
import { PATIENT_STORIES } from "@/data/patientStories";

export const metadata: Metadata = {
  title: "Patient Stories | Aura Dental Hyderabad",
  description:
    "Real before-and-after cases from Aura Dental — dentures, implant prosthesis, diastema closure, tooth decay and advanced dentistry.",
};

export default function Page() {
  return (
    <>
      <PageHero
        title="Patient Stories"
        intro="Every case at Aura reflects our promise of thoughtful care and beautiful results. From regular check-ups to complex treatments, we guide you with comfort and clarity throughout."
        ctaLabel="Book Your Free Consultation"
        ctaHref="/contact"
      />

      <section className="bg-white px-5 py-[30px] md:py-[50px]">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PATIENT_STORIES.map((story) => (
            <PatientStoryCard key={story.href} story={story} />
          ))}
        </div>
      </section>

      <NeedHelpCta subheading="Start Your Aligners Journey with Aura Dental" />
    </>
  );
}
