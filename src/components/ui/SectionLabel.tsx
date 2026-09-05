import Image from "next/image";

type Props = {
  icon: string;
  label: string;
  align?: "left" | "center";
  size?: number;
  className?: string;
};

/**
 * The small icon + label eyebrow used above most section headings
 * ("Why Aura Dental", "Our Treatments", "About Us", "Testimonials", "FAQ").
 */
export default function SectionLabel({
  icon,
  label,
  align = "center",
  size = 29,
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
        alt={label}
        width={size}
        height={size}
        className="h-auto shrink-0"
        style={{ width: size }}
      />
      {/* `.media-text` carries no size/weight of its own — it inherits body type */}
      <span className="font-sans text-[18px] text-[#1d4231]">{label}</span>
    </div>
  );
}
