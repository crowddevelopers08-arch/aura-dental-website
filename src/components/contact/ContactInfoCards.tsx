import Image from "next/image";
import { SITE } from "@/data/site";

const CARDS = [
  {
    icon: "/images/offer.png",
    iconSize: 50,
    title: "Avail Exclusive Launch Offers!",
    body: (
      <p className="mt-1.5 text-[18px] leading-[1.4] text-[#444]">
        <strong className="text-black">50% Off</strong> on Dental Implants
        <br />
        <strong className="text-black">50% Off</strong> on Invisalign Treatments
      </p>
    ),
  },
  {
    icon: "/images/accounting.png",
    iconSize: 50,
    title: "No Cost EMI Options Available",
    body: (
      <p className="mt-1.5 text-[18px] leading-[1.4] text-[#444]">
        FIBE | MEDIBUDDY | BAJAJ FINANCE
      </p>
    ),
  },
  {
    icon: "/images/envelop.svg",
    iconSize: 44,
    title: "Connect With Us",
    body: (
      <p className="mt-1.5 text-[18px] leading-[1.4] text-[#444]">
        Email:{" "}
        <a href={`mailto:${SITE.email}`} className="text-[#c9a227] hover:underline">
          {SITE.email}
        </a>
      </p>
    ),
  },
];

export default function ContactInfoCards() {
  return (
    <div className="space-y-7">
      {CARDS.map((c) => (
        <div key={c.title} className="flex items-center gap-4">
          <Image
            src={c.icon}
            alt=""
            width={c.iconSize}
            height={c.iconSize}
            className="shrink-0 object-contain"
            style={{ width: c.iconSize, height: c.iconSize }}
          />
          <div>
            <h4 className="text-[24px] font-semibold leading-snug text-black">{c.title}</h4>
            {c.body}
          </div>
        </div>
      ))}
    </div>
  );
}
