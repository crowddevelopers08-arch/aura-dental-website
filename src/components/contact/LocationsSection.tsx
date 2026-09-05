import Image from "next/image";
import { LOCATIONS } from "@/data/site";

export default function LocationsSection() {
  return (
    <section className="bg-white px-5 py-[30px] md:py-[50px]">
      <div className="mx-auto max-w-[1240px]">
        <h3 className="text-center text-[26px] font-bold text-black md:text-left">
          Our Locations
        </h3>

        {/* Plain columns rather than cards; the clinic name carries the map link
            that the old "Get Directions" button used to. */}
        <div className="mt-5 md:mt-8 grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 sm:gap-12">
          {LOCATIONS.map((loc) => (
            <div key={loc.name}>
              <div className="flex items-start gap-3">
                <Image
                  src="/images/location.svg"
                  alt=""
                  width={26}
                  height={26}
                  className="mt-1 h-[26px] w-[26px] shrink-0"
                />
                <div>
                  <h4 className="text-[24px] font-semibold leading-snug text-black">
                    <a
                      href={loc.map}
                      target="_blank"
                      rel="noopener"
                      className="hover:underline"
                    >
                      {loc.name}
                    </a>
                  </h4>
                  <p className="mt-1 text-[18px] leading-[1.5] text-[#444]">{loc.address}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <Image
                  src="/images/footer-call.svg"
                  alt=""
                  width={26}
                  height={26}
                  className="h-[26px] w-[26px] shrink-0"
                />
                <a href={loc.tel} className="text-[18px] text-[#444] hover:underline">
                  {loc.phone}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
