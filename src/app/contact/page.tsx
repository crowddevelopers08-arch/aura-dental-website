import type { Metadata } from "next";
import Image from "next/image";
import ContactInfoCards from "@/components/contact/ContactInfoCards";
import LocationsSection from "@/components/contact/LocationsSection";
import EnquiryForm from "@/components/ui/EnquiryForm";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact Aura Dental | Book a Free Consultation in Madinaguda & Kondapur",
  description:
    "Book your free dental consultation at Aura Dental, Hyderabad. Exclusive launch offers, no-cost EMI options and clinics in Madinaguda and Kondapur.",
};

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#ddd5ca] to-white px-5 py-[34px] md:py-[80px]">
        <div className="mx-auto max-w-[1240px] text-center">
          <h1 className="text-[32px] font-semibold leading-[1.2] text-black md:text-[40px]">
            Contact Us
          </h1>
        </div>
      </section>

      {/* Reach out + form */}
      <section id="Form" className="bg-white px-5 py-[30px] md:py-[50px]">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-start gap-6 md:gap-12 lg:grid-cols-2">
          {/* Below lg the wrapper dissolves (`display: contents`) so the form can
              sit between the heading and the copy; from lg it is the left column
              again. */}
          <div className="contents lg:block">
            {/* The eyebrow is inline, so the centring has to come from here */}
            <div className="order-1 text-center md:text-left">
              <strong className="text-[18px] font-semibold text-[#1d4231]">Reach Out.</strong>
              <h2 className="mt-2 text-[32px] font-semibold leading-[1.3] text-black">
                We&rsquo;re Here to Listen, Guide, and Care.
              </h2>
            </div>

            <div className="order-3">
              {/* Stacked, the row gap stands in for the top margin */}
              <p className="text-center text-[18px] leading-[1.4] text-[#444] md:text-left lg:mt-4">
                At Aura Dental, every detail, from the way we listen to how we care, is designed
                around you. Whether you&rsquo;re looking to book your first consultation, explore a
                treatment, or simply have a question about your smile, we&rsquo;d love to hear from
                you.
              </p>

              <div className="mt-6 md:mt-10">
                <ContactInfoCards />
              </div>
            </div>
          </div>

          <div
            id="Get-in-Touch"
            className="order-2 rounded-[16px] bg-[#d3b871] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_12px_25px_rgba(0,0,0,0.07)] md:p-10"
          >
            <h3 className="mb-5 md:mb-8 text-[26px] font-bold text-white">
              Drop us Message for any Query
            </h3>
            <EnquiryForm layout="stacked" />
          </div>
        </div>
      </section>

      <LocationsSection />

      {/* Closing band. The band's height comes from the copy alone; on desktop
          the cut-out is taken out of flow and stood on the bottom edge, so her
          head sits over the white section above. */}
      <section className="relative bg-[#d3b871] px-5">
        <div className="relative mx-auto max-w-[1240px]">
          {/* align-desktop-center on the source — centred at every breakpoint */}
          <div className="py-8 md:py-14 text-center lg:max-w-[68%]">
            <h2 className="text-[32px] font-bold leading-[1.6] text-black">
              At <span className="text-[#1d4231]">Aura Dental</span> we curate experiences
            </h2>
            <p className="mt-2 text-[20px] leading-[1.4] text-[#333]">
              that feel as good as they look.
            </p>

            <div className="mt-5 md:mt-8">
              <Button
                href="#Form"
                className="!bg-[#1d4231] !text-[#d3b871] hover:!bg-[#163527]"
              >
                Book Your Free Consultation
              </Button>
            </div>
          </div>

          <Image
            src="/images/young-lady-looking-pointing-copy-space-1-1.png"
            alt=""
            width={688}
            height={773}
            sizes="(min-width: 1024px) 340px, 420px"
            className="pointer-events-none mx-auto h-auto w-full max-w-[420px] object-contain lg:absolute lg:bottom-0 lg:right-0 lg:mx-0 lg:w-[340px] lg:max-w-none"
          />
        </div>
      </section>
    </>
  );
}
