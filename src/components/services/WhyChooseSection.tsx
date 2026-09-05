import Image from "next/image";
import type { ServicePage } from "@/data/services";

export default function WhyChooseSection({ data }: { data: ServicePage["whyChoose"] }) {
  return (
    <section className="bg-white px-5 py-[30px] md:py-[50px]">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-start gap-6 md:gap-10 lg:grid-cols-[2.1fr_1fr] lg:gap-16">
        <div>
          <h4 className="text-center text-[24px] font-semibold text-[#1d4231] md:text-left">
            {data.eyebrow}
          </h4>
          <h2 className="mt-1 text-center text-[32px] font-bold leading-[1.3] text-black md:text-left">
            {data.heading}
          </h2>
          <p className="mt-4 text-[18px] leading-[1.4] text-[#444]">{data.intro}</p>

          {/* One item per row, divided by a hairline, with the copy set beside
              the icon tile rather than under it. */}
          <div className="mt-5 md:mt-8 divide-y divide-[#e2e2e2]">
            {data.items.map((item) => (
              <div key={item.title} className="flex items-start gap-5 py-6 first:pt-0">
                <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[10px] bg-[#d3b871]">
                  <Image
                    src={item.icon}
                    alt=""
                    width={44}
                    height={44}
                    className="h-11 w-11 object-contain"
                  />
                </span>
                <div>
                  <h3 className="text-[26px] font-bold leading-snug text-black">{item.title}</h3>
                  <p className="mt-1 text-[18px] leading-[1.4] text-[#444]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-32">
          {/* Every whyChoose photo is ~650x1100; the old 520x640 hint reserved
              the wrong height and shifted the row on load. */}
          <Image
            src={data.image}
            alt={data.heading}
            width={650}
            height={1100}
            sizes="(min-width: 1024px) 380px, 100vw"
            className="h-auto w-full rounded-[20px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
