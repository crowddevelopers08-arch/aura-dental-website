import Button from "@/components/ui/Button";

/** "Our Commitment" closing band used on /about-us and /dental-tourism. */
export default function CommitmentBand() {
  return (
    <section className="bg-[#d2b770] px-5 py-7 md:py-12">
      <div className="mx-auto max-w-[1240px] text-center">
        <h2 className="text-[32px] font-bold leading-[1.3] text-black">Our Commitment</h2>
        <p className="mx-auto mt-4 max-w-[760px] text-[18px] leading-[1.4] text-black">
          To Help You Bring Out the Best Smile Within You
        </p>
        <div className="mt-6">
          {/* Colours invert against the gold band: green pill, gold label */}
          <Button
            href="/contact"
            className="!bg-[#1d4231] !text-[#d3b871] hover:!bg-[#163527]"
          >
            Book Your Free Consultation
          </Button>
        </div>
      </div>
    </section>
  );
}
