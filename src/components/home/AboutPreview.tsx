import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";

const FEATURES = [
  "Modern Equipment",
  "Easy Online Appointment",
  "Comfortable Clinic",
  "Always Monitored",
];

const STATS = [
  { value: "5000+", label: "Smiles Delivered" },
  { value: "10,000+", label: "Dental Implants" },
  { value: "100%", label: "Patient Satisfaction Rate" },
];

export default function AboutPreview() {
  return (
    <section className="bg-white px-5 py-[30px] md:py-[50px]">
      {/* Split into three blocks — label+heading, portrait, copy — so that on
          mobile the portrait sits between the heading and the copy. From lg up
          cell coordinates put them back into two columns, with the portrait
          taking roughly a third: at an even 1:1 split the copy column is too
          narrow, and the heading, intro and "Patient Satisfaction Rate" each
          pick up an extra wrapped line. */}
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 lg:grid-cols-[0.47fr_1fr] lg:grid-rows-[auto_1fr] lg:gap-x-14">
        <div className="lg:col-start-2 lg:row-start-1">
          <SectionLabel icon="/images/about-us.svg" label="About Us" align="left" size={30} />

          <h2 className="mt-4 text-center text-[32px] font-bold leading-[1.3] text-black md:text-left">
            Specialist Dental Clinic near Madinaguda, Kondapur
          </h2>
        </div>

        <div className="my-5 md:my-8 lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:my-0 lg:self-center">
          <Image
            src="/images/specialist-dental-clinic-near-madeenaguda-updated.png"
            alt="Specialist Dental Clinic near Madeenaguda"
            width={620}
            height={620}
            className="h-auto w-full max-w-full object-contain"
          />
        </div>

        <div className="lg:col-start-2 lg:row-start-2">
          <p className="text-[18px] leading-[1.4] text-[#444] lg:mt-4">
            Aura Dental is a modern dental care clinic in Madinaguda, led by Dr. Siva Nagini
            Yalavarthi, a highly qualified Implantologist and Prosthodontist with over 12&nbsp;years
            of clinical experience.
          </p>

          <ul className="mt-5 flex flex-wrap">
            {FEATURES.map((f) => (
              <li
                key={f}
                className="mb-2 inline-block min-w-[49.6%] bg-[url('/images/list1.svg')] bg-position-[left_6px] bg-no-repeat pl-[25px] text-[18px] text-[#444]"
              >
                {f}
              </li>
            ))}
          </ul>

          <div className="my-[30px] grid grid-cols-1 gap-4 border-y border-black py-2.5 sm:grid-cols-3">
            {STATS.map((s) => (
              /* `.home-counter h3 { font-size: 22px }` — the gold figure inherits that size */
              <h3 key={s.value} className="m-0 p-0 text-center text-[22px] leading-snug sm:text-left">
                <span className="font-black text-[#d2b770]">{s.value}</span>
                <br />
                {s.label}
              </h3>
            ))}
          </div>

          <div className="text-center md:text-left">
            <Button href="/about-us">Read More</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
