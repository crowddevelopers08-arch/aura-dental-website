import Image from "next/image";
import Button from "@/components/ui/Button";

/** Deep-green band with the gold accent headline and the young-lady cut-out. */
export default function BestSmileCta() {
  return (
    <section className="relative bg-[#1d4231] px-5">
      <div className="relative mx-auto max-w-[1240px]">
        {/* The band's height comes from this block alone. On desktop the cut-out
            is taken out of flow and stood on the band's bottom edge, so she
            overflows above it rather than stretching the band to her own
            height — her head sits over the white section above. */}
        <div className="py-6 md:py-10 text-center md:text-left lg:max-w-[62%]">
          {/* inline `font-size:60px` on the source heading */}
          <h2 className="text-[36px] font-bold leading-[1.2] text-white md:text-[60px]">
            Bring Out the <span className="text-[#d3b871]">Best Smile</span> Within You
          </h2>
          <div className="mt-5 md:mt-8">
            <Button href="/#Book-Free-Consultation">Book Your Free Consultation</Button>
          </div>
        </div>

        <Image
          src="/images/young-lady-looking-pointing-copy-space-1-1.png"
          alt="Bring out the best smile within you"
          width={688}
          height={773}
          sizes="(min-width: 1024px) 360px, 420px"
          className="pointer-events-none mx-auto h-auto w-full max-w-[420px] object-contain lg:absolute lg:right-0 lg:bottom-0 lg:mx-0 lg:w-[360px] lg:max-w-none"
        />
      </div>
    </section>
  );
}
