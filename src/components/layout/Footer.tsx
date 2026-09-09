import Image from "next/image";
import Link from "next/link";
import { LOCATIONS, OPENING_HOURS, QUICK_LINKS, SITE } from "@/data/site";
import SocialIcons from "./SocialIcons";

function LocationIcon() {
  return (
    <svg viewBox="0 0 384 512" className="mr-2 inline h-4 w-4 fill-current" aria-hidden="true">
      <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 512 512" className="mr-2 inline h-4 w-4 fill-current" aria-hidden="true">
      <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 512 512" className="mr-2 inline h-4 w-4 fill-current" aria-hidden="true">
      <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="text-[15px] text-white">
      {/* Main dark-green band */}
      <div className="bg-[#1d4231]">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-6 md:gap-10 px-5 py-[30px] md:py-[50px] md:grid-cols-2 lg:grid-cols-3">
          {/* Column 1 — logo + contact */}
          <div>
            <Image
              src={SITE.logo}
              alt="Aura-Dental-Logo"
              width={130}
              height={73}
              className="h-auto w-[130px] max-w-full"
            />
            {/* The two clinics sit side by side, with the shared email beneath */}
            <div className="mt-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {LOCATIONS.map((loc) => (
                  <div key={loc.name} className="space-y-2">
                    <a
                      href={loc.map}
                      target="_blank"
                      rel="noopener"
                      className="flex w-fit items-center text-[#d3b871] transition-opacity hover:opacity-80"
                    >
                      <LocationIcon />
                      {loc.name}
                    </a>
                    <a
                      href={loc.tel}
                      className="flex w-fit items-center text-[#d3b871] transition-opacity hover:opacity-80"
                    >
                      <PhoneIcon />
                      {loc.phone}
                    </a>
                  </div>
                ))}
              </div>

              <a
                href={`mailto:${SITE.email}`}
                className="mt-5 flex w-fit items-center text-[#d3b871] transition-opacity hover:opacity-80"
              >
                <MailIcon />
                {SITE.email}
              </a>
            </div>
          </div>

          {/* Column 2 — quick links */}
          <div>
            <h4 className="mb-5 text-[24px] font-semibold text-white">Quick links</h4>
            <ul className="flex flex-wrap p-0">
              {QUICK_LINKS.map((l) => (
                <li
                  key={l.href}
                  className="mb-2.5 min-w-[45%] bg-[url('/images/list1.svg')] bg-position-[left_3px] bg-no-repeat pl-[25px]"
                >
                  <Link href={l.href} className="text-white transition-opacity hover:opacity-80">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — opening hours */}
          <div>
            <h4 className="mb-5 text-[24px] font-semibold text-white">Opening hours</h4>
            <table className="w-full border-collapse">
              <tbody>
                {OPENING_HOURS.map((h) => (
                  <tr key={h.day}>
                    <td className="border-b border-[#ccc] p-2 text-white">{h.day}</td>
                    <td className="border-b border-[#ccc] p-2 text-right text-white">{h.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Gold bottom bar */}
      <div className="bg-[#d2b770]">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-3 px-5 py-4 text-center text-[#1d4231] md:flex-row md:justify-between md:text-left">
          {/* `flex-wrap`: three links plus the separators outrun a narrow bar */}
          <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-[15px] md:justify-start">
            <Link href="/privacy-policy" className="text-[#1d4231] hover:underline">
              Privacy Policy
            </Link>
            <span aria-hidden="true">|</span>
            <Link href="/terms-and-conditions" className="text-[#1d4231] hover:underline">
              Terms &amp; Conditions
            </Link>
            <span aria-hidden="true">|</span>
            <Link
              href="/cancellation-and-refund-policy"
              className="text-[#1d4231] hover:underline"
            >
              Cancellation &amp; Refunds
            </Link>
          </div>
          <SocialIcons />
          <div className="text-[15px] text-[#1d4231] md:text-right">{SITE.copyright}</div>
        </div>
      </div>
    </footer>
  );
}
