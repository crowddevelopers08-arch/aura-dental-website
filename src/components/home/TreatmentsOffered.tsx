import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import PatientStoryCard from "@/components/sections/PatientStoryCard";
import { PATIENT_STORIES } from "@/data/patientStories";

export default function TreatmentsOffered() {
  return (
    <section className="bg-white px-5 py-[30px] md:py-[50px]">
      <div className="mx-auto max-w-[1240px]">
        {/* Heading, strapline and CTA sit on the same three columns as the
            benefits grid above, bottom-aligned to the heading. The eyebrow lives
            inside the heading's cell, not above the grid: `items-end` would
            otherwise push the heading down by however far the strapline wraps,
            opening a gap under the eyebrow that changes with the viewport. */}
        <div className="grid grid-cols-1 items-end gap-x-16 gap-y-4 md:grid-cols-3">
          <div>
            <SectionLabel
              icon="/images/aura-dental-happy-teeth.svg"
              label="Our Treatments"
              align="left"
            />
            <h2 className="mt-2 text-center text-[32px] font-bold leading-[1.3] text-black md:text-left">
              Treatments we Offer
            </h2>
          </div>

          <p className="text-center text-[18px] leading-[1.4] text-[#444] md:text-left">
            Scroll down to see how we helped our patients transform their smiles!
          </p>

          <div className="flex justify-center md:justify-end">
            <Button href="/patient-stories">View All Treatments</Button>
          </div>
        </div>

        <div className="mt-6 md:mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PATIENT_STORIES.map((story) => (
            <PatientStoryCard key={story.href} story={story} />
          ))}
        </div>
      </div>
    </section>
  );
}
