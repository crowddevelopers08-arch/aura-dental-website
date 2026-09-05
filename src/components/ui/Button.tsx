import Link from "next/link";
import type { ComponentProps } from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  /** "gold" is the site's primary CTA; "outline" is the light variant used on dark bands. */
  variant?: "gold" | "outline";
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

/**
 * Mirrors the source `.hs-button`:
 * background #d3b871 · radius 20px · color #1d4231 · 600 weight · 8px/20px padding.
 */
export default function Button({
  href,
  children,
  variant = "gold",
  className = "",
  ...rest
}: Props) {
  const base =
    "inline-block rounded-[20px] px-5 py-2 text-[16px] font-semibold transition-all duration-200";
  const styles =
    variant === "gold"
      ? "bg-[#d3b871] text-[#1d4231] hover:bg-[#c9a95d]"
      : "border-2 border-[#d3b871] bg-transparent text-[#d3b871] hover:bg-[#d3b871] hover:text-[#1d4231]";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </Link>
  );
}
