import Image from "next/image";

type Props = {
  icon: string;
  iconAlt?: string;
  heading: string;
  /** Mirrors the source's `align-desktop-*`; mobile is always centred. */
  align?: "left" | "center";
  width?: number;
  height?: number;
  className?: string;
};

/**
 * A `.media-content-section` whose `.media-text` holds an `<h2>` — the icon and the
 * section heading sit on one inline row (used for "What Makes Aura's … Different?"
 * and the service-page "FAQ" heading).
 */
export default function IconHeading({
  icon,
  iconAlt,
  heading,
  align = "left",
  width = 45,
  height = 47,
  className = "",
}: Props) {
  return (
    <div
      className={`flex items-center gap-2.5 ${
        align === "center" ? "justify-center" : "justify-center md:justify-start"
      } ${className}`}
    >
      <Image
        src={icon}
        alt={iconAlt ?? ""}
        width={width}
        height={height}
        className="shrink-0"
        style={{ width, height }}
      />
      {/* text-align matters too once the heading wraps onto a second line */}
      <h2
        className={`text-[32px] font-bold leading-[1.3] text-black ${
          align === "center" ? "text-center" : "text-center md:text-left"
        }`}
      >
        {heading}
      </h2>
    </div>
  );
}
