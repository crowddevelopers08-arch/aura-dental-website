"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS, SERVICE_LINKS, SITE } from "@/data/site";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  // Close both menus whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // `relative` on the header so the services mega panel centres on the page
  // rather than on the nav item it hangs off.
  return (
    <header className="relative w-full bg-[#1d4231]">
      <nav className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-5 py-2.5">
        <Link href="/" className="shrink-0" aria-label="Aura Dental — home">
          <Image
            src={SITE.logo}
            alt="Aura-Dental-Logo"
            width={120}
            height={67}
            priority
            className="h-[52px] w-auto max-w-[120px] object-contain lg:h-[67px]"
          />
        </Link>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link
            href="/contact"
            className="rounded-[20px] bg-[#d3b871] px-4 py-2 text-[14px] font-semibold text-[#1d4231]"
          >
            Book Now
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px]"
          >
            <span
              className={`block h-[3px] w-6 rounded-full bg-white transition-transform duration-300 ${
                mobileOpen ? "translate-y-[8px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[3px] w-6 rounded-full bg-white transition-opacity duration-200 ${
                mobileOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-[3px] w-6 rounded-full bg-white transition-transform duration-300 ${
                mobileOpen ? "-translate-y-[8px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden flex-1 items-center justify-around lg:flex">
          <ul className="flex items-center">
            {NAV_LINKS.map((item) =>
              item.children ? (
                <li key={item.label} className="group mx-2 xl:mx-4">
                  <button
                    type="button"
                    className="flex cursor-pointer items-center gap-1.5 py-6 text-[16px] font-normal text-white"
                  >
                    <span>{item.label}</span>
                    <Image
                      src="/images/arrow.png"
                      alt=""
                      width={20}
                      height={20}
                      className="max-w-[20px] align-middle transition-transform duration-200 group-hover:rotate-180"
                    />
                  </button>

                  {/* Mega panel */}
                  <div className="invisible absolute left-1/2 top-full z-50 w-[900px] -translate-x-1/2 pt-1 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="flex gap-6 rounded-[20px] bg-[#1d4231] p-[25px] shadow-2xl">
                      <div className="basis-[350px]">
                        <h2 className="text-[32px] font-bold leading-9 text-white">
                          Experience the Aura of Care
                        </h2>
                        <span className="mt-3 block text-[16px] leading-[1.4] text-white">
                          We combine gentle care with advanced technology to ensure every visit
                          makes your smile healthy, bright, and full of confidence.
                        </span>
                      </div>
                      <div className="flex flex-1 basis-[500px] flex-wrap content-start">
                        {SERVICE_LINKS.map((s) => (
                          <Link
                            key={s.href}
                            href={s.href}
                            className="mb-[5px] basis-[225px] rounded-lg px-3 py-2 text-[16px] text-white transition-colors hover:bg-white/10"
                          >
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              ) : (
                <li key={item.href} className="mx-2 xl:mx-4">
                  <Link
                    href={item.href}
                    className="block py-6 text-[16px] font-normal text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          <div className="ml-6 shrink-0 text-center">
            <Link
              href="/contact"
              className="block rounded-[20px] bg-[#d3b871] px-5 py-2 text-[16px] font-semibold text-[#1d4231] transition-opacity hover:opacity-90"
            >
              Book Your Free Consultation
            </Link>
            <span className="mx-auto mt-[3px] block text-center text-[12px] text-white">
              No Cost EMI Options Available
            </span>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="max-h-[calc(100dvh-160px)] overflow-y-auto border-t border-white/10 bg-[#1d4231] px-5 pb-5 md:pb-8 pt-4 lg:hidden">
          <ul className="flex flex-col">
            {NAV_LINKS.map((item) =>
              item.children ? (
                <li key={item.label} className="border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setServicesOpen((v) => !v)}
                    aria-expanded={servicesOpen}
                    className="flex w-full items-center justify-between py-3.5 text-left text-[16px] text-white"
                  >
                    <span>{item.label}</span>
                    <span
                      className={`transition-transform duration-200 ${
                        servicesOpen ? "rotate-180" : ""
                      }`}
                    >
                      <Image src="/images/arrow.png" alt="" width={18} height={18} />
                    </span>
                  </button>
                  {servicesOpen && (
                    <ul className="pb-3 pl-3">
                      {item.children.map((s) => (
                        <li key={s.href}>
                          <Link
                            href={s.href}
                            className="block py-2.5 text-[15px] text-white/90"
                          >
                            {s.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.href} className="border-b border-white/10">
                  <Link href={item.href} className="block py-3.5 text-[16px] text-white">
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          <div className="mt-6 text-center">
            <Link
              href="/contact"
              className="block rounded-[20px] bg-[#d3b871] px-5 py-2.5 text-[16px] font-semibold text-[#1d4231]"
            >
              Book Your Free Consultation
            </Link>
            <span className="mt-1.5 block text-[12px] text-white">
              No Cost EMI Options Available
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
