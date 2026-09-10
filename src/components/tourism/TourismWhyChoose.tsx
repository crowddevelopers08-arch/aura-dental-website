const REASONS = [
  {
    title: "Premium Care",
    description:
      "From the moment you step into Aura Dental, you'll experience the same warm, modern, hygienic environment you expect from top international clinics.",
  },
  {
    title: "A comfort-first experience with Honest Pricing",
    description:
      "Clear treatment plans, transparent costs, and gentle, supportive care that keeps you relaxed from the moment you plan your trip.",
  },
  {
    title: "Treatment plans built around your travel dates",
    description:
      "We schedule consultations, procedures, and follow-ups to fit perfectly within your stay.",
  },
  {
    title: "Priority appointments for short-stay travelers",
    description:
      "We make sure you get fast access, have minimal waiting time, and smooth dental treatment throughout.",
  },
];

export default function TourismWhyChoose() {
  return (
    <section className="bg-white px-5 py-[30px] md:py-[50px]">
      <div className="mx-auto max-w-[1240px]">
        <h2 className="text-left text-[32px] font-bold leading-[1.3] text-black">
          Why Patients Around the World Choose Aura Dental
        </h2>
        <p className="mt-4 max-w-[900px] text-[18px] leading-[1.4] text-[#444]">
          Medical tourism at Aura is centered around comfort, clarity, and care. Whether you&rsquo;re
          visiting India for a short trip or planning a full smile upgrade, we make every step
          simple and stress-free.
        </p>

        <div className="mt-6 md:mt-10 grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:gap-18">
          {REASONS.map((r, i) => (
            <div
              key={r.title}
              className="rounded-[18px] bg-white p-6 md:p-12 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_12px_25px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08),0_25px_50px_rgba(0,0,0,0.12)]"
            >
              {/* Decorative sequence marker — the headings already carry the meaning */}
              <span
                aria-hidden="true"
                className="block font-sans text-[48px] font-bold leading-none text-[#d3b871]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 md:mt-8 text-[26px] font-bold leading-snug text-black">{r.title}</h3>
              <p className="mt-4 text-[18px] leading-[1.4] text-[#444]">{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
