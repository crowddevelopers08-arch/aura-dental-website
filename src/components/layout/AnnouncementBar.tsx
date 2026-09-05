import Link from "next/link";
import GiftIcon from "@/components/ui/GiftIcon";

/** Gold strip pinned above the header — matches the source announcement row. */
export default function AnnouncementBar() {
  return (
    <div className="w-full bg-[#d2b770] px-5 py-2 text-center text-[14px] leading-snug text-black">
      {/* Sized in `em` and nudged by -0.125em, the same baseline offset Font Awesome
          applies to the source site's `<i class="fas fa-gift">`. */}
      <GiftIcon className="mr-1.5 inline-block h-[1em] w-[1em] align-[-0.125em] fill-current" />
      <strong className="font-bold">Exclusive Launch Offers Available.</strong> Get 50% off on
      Dental Implants. 50% off on Invisalign Treatments!{" "}
      <Link
        href="/contact"
        className="font-bold text-[#1d4231] underline underline-offset-2"
      >
        Book Now
      </Link>
      .
    </div>
  );
}
