import Image from "next/image";
import IconHeading from "@/components/ui/IconHeading";
import type { ServicePage } from "@/data/services";

export default function WhatMakesDifferent({ data }: { data: ServicePage["different"] }) {
  return (
    <section className="bg-[#ececec] px-5 py-[30px] md:py-[50px]">
      <div className="mx-auto max-w-[1240px]">
        <IconHeading
          icon="/images/faq-costumer-service-1.svg"
          iconAlt="faq-costumer-service 1"
          heading={data.heading}
          align="left"
        />

        {/* Image + centred title only — `item.description` is intentionally not
            rendered here; it stays in the data for other surfaces. */}
        <div className="mt-6 md:mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {data.items.map((item) => (
            <article
              key={item.title}
              className="flex h-full flex-col overflow-hidden rounded-[18px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04),0_12px_25px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08),0_25px_50px_rgba(0,0,0,0.12)]"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={267}
                className="aspect-[3/2] w-full object-cover"
              />
              <div className="flex flex-1 items-center justify-center p-5">
                <h3 className="text-center text-[20px] font-bold leading-snug text-black">
                  {item.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
