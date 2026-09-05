import Link from "next/link";
import GiftIcon from "@/components/ui/GiftIcon";

/**
 * Floating launch-offer pill, home page only. Bottom-left so it clears the chat
 * launcher in the opposite corner; the anchor scrolls to the booking form,
 * which `[id] { scroll-margin-top }` already offsets past the sticky header.
 *
 * It pulses on a loop to catch the eye, and holds still on hover so it isn't
 * shrinking away from the pointer mid-click.
 */
export default function LaunchOfferCta() {
  return (
    <Link
      href="#Book-Free-Consultation"
      className="animate-offer-pulse fixed bottom-5 left-5 z-[80] inline-flex items-center gap-2 rounded-full border-[3px] border-[#d3b871] bg-[#1d4231] px-3.5 py-2.5 text-[13px] font-bold text-white shadow-[0_6px_20px_rgba(0,0,0,0.28)] transition-colors hover:bg-[#163527] hover:[animation-play-state:paused] sm:px-6 sm:py-3 sm:text-[16px]"
    >
      <GiftIcon className="h-[1em] w-[1em] shrink-0 fill-current" />
      Avail Exclusive Launch Offer
    </Link>
  );
}
