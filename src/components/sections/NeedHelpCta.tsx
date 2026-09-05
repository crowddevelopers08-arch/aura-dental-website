import Image from "next/image";
import Button from "@/components/ui/Button";

type Props = {
  heading?: string;
  subheading: string;
  ctaLabel?: string;
  href?: string;
};

/**
 * The gold "Need Help?" card that closes the service and patient-stories pages.
 * `heading` honours newlines (rendered `whitespace-pre-line`), so the two-line
 * break is explicit rather than left to however the column happens to wrap.
 */
export default function NeedHelpCta({
  heading = "Need Help?\nWe’ve Got You Covered!",
  subheading,
  ctaLabel = "Book a Free Consultation",
  href = "/contact",
}: Props) {
  return (
    <section className="bg-white px-5 py-[30px] md:py-[50px]">
      <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-6 rounded-[20px] bg-[#d2b770] p-8 text-center lg:flex-row lg:justify-between lg:text-left">
        <h2 className="whitespace-pre-line text-[32px] font-bold leading-[1.3] text-black">
          {heading}
        </h2>

        <div className="flex flex-col items-center gap-5 sm:flex-row">
          <p className="text-[18px] leading-[1.4] text-[#1d4231] sm:max-w-[260px]">{subheading}</p>
          <Image
            src="/images/curved-arrow_7893900.png"
            alt=""
            width={56}
            height={56}
            className="hidden h-14 w-14 object-contain sm:block"
          />
          <Button
            href={href}
            className="!bg-[#1d4231] !px-7 !py-3 !text-white hover:!bg-[#163527]"
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
