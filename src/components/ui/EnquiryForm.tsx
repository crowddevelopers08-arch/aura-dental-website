"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { COUNTRIES, DEFAULT_COUNTRY_ISO, countryLabel } from "@/data/countries";
import { TREATMENT_OPTIONS } from "@/data/site";

type Props = {
  /**
   * "strip" is the one-row band on the homepage and service pages; "stacked"
   * is the column that sits inside the gold card on /contact.
   */
  layout?: "strip" | "stacked";
};

/** Solid caret, matching the source site's dropdowns. */
function Caret({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 10 6"
      aria-hidden="true"
      className={`pointer-events-none shrink-0 fill-[#333] ${className}`}
    >
      <path d="M0 0h10L5 6z" />
    </svg>
  );
}

/**
 * Name, phone with a country-code selector, email and service. Same fields in
 * both layouts — only the shell changes.
 */
export default function EnquiryForm({ layout = "strip" }: Props) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [iso, setIso] = useState(DEFAULT_COUNTRY_ISO);
  const [treatment, setTreatment] = useState("");

  // Recorded with the lead so the clinic can see which page drove the enquiry.
  const pathname = usePathname();

  // Keyed on ISO, not dial code — US and CA both dial +1.
  const dial = COUNTRIES.find((c) => c.iso === iso)?.dial ?? "+91";

  const stacked = layout === "stacked";

  /** Field shell: a white pill in the strip, a pale inset box in the card. */
  const FIELD = stacked
    ? "flex h-[46px] w-full items-center rounded-[6px] bg-[#f2f5f7] px-4 transition-shadow focus-within:ring-2 focus-within:ring-[#1d4231]"
    : "flex h-[46px] items-center rounded-[8px] bg-white px-5 transition-shadow focus-within:ring-2 focus-within:ring-[#d3b871]";

  /* No text colour here — callers set it, so a select can swap to the
     placeholder grey without two competing `text-[…]` utilities. */
  const INPUT =
    "h-full w-full min-w-0 bg-transparent text-[15px] outline-none placeholder:text-[#9a9a9a]";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;

    // Read before the first await — React pools the event, and `currentTarget`
    // is null by the time the fetch resolves.
    const data = new FormData(e.currentTarget);

    setSending(true);
    setError(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          dialCode: data.get("dial_code"),
          country: data.get("country"),
          treatment: data.get("treatment"),
          source: "ENQUIRY_FORM",
          pagePath: pathname,
        }),
      });

      const body = (await res.json().catch(() => null)) as
        | { errors?: string[] }
        | null;

      if (!res.ok) {
        setError(body?.errors?.[0] ?? "Something went wrong. Please try again.");
        return;
      }

      setSent(true);
    } catch {
      setError("We couldn't reach the server. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  /** Shown above the button in both layouts. */
  const errorNote = error ? (
    <p role="alert" className="text-[14px] font-medium text-[#d03b3b]">
      {error}
    </p>
  ) : null;

  if (sent) {
    return (
      <div
        className={`rounded-[8px] px-6 py-8 text-center ${
          stacked ? "bg-[#f2f5f7]" : "mx-auto max-w-[720px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04),0_12px_25px_rgba(0,0,0,0.07)]"
        }`}
      >
        <h3 className="text-[26px] font-bold text-[#1d4231]">Thank you!</h3>
        <p className="mt-2 text-[16px] text-[#444]">
          Your request has been received. Our team will reach out to confirm your free consultation
          shortly.
        </p>
      </div>
    );
  }

  const name = (
    <div className={FIELD}>
      <input
        name="name"
        required
        aria-label="Name"
        placeholder="Name*"
        className={`${INPUT} text-[#111]`}
      />
    </div>
  );

  const email = (
    <div className={FIELD}>
      <input
        name="email"
        type="email"
        required
        aria-label="Email"
        placeholder="Email*"
        className={`${INPUT} text-[#111]`}
      />
    </div>
  );

  // Phone: country selector + dial-code prefix + national number. The visible
  // "IN ▾" is our own markup with a transparent native select laid over it, so
  // the closed control shows just the ISO code while the open list keeps the
  // platform's own picker, search and keyboard nav.
  const phone = (
    <div className={`${FIELD} gap-3`}>
      <span className="relative flex shrink-0 items-center gap-1.5">
        <span aria-hidden="true" className="text-[13px] font-bold tracking-wide text-[#111]">
          {iso}
        </span>
        <Caret className="h-1.5 w-2.5" />
        <select
          name="country"
          aria-label="Country dialling code"
          value={iso}
          onChange={(e) => setIso(e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        >
          {COUNTRIES.map((c) => (
            <option key={c.iso} value={c.iso}>
              {countryLabel(c)}
            </option>
          ))}
        </select>
      </span>

      <span className="h-5 w-px shrink-0 bg-[#e2e2e2]" />

      <span className="shrink-0 text-[15px] text-[#111]">{dial}</span>
      <input type="hidden" name="dial_code" value={dial} />
      <input
        name="phone"
        type="tel"
        inputMode="tel"
        required
        aria-label="Phone number"
        className={`${INPUT} text-[#111]`}
      />
    </div>
  );

  const services = (
    <div className={`${FIELD} relative`}>
      <select
        id="enquiry-treatment"
        name="treatment"
        aria-label="Services"
        value={treatment}
        onChange={(e) => setTreatment(e.target.value)}
        className={`${INPUT} cursor-pointer appearance-none pr-6 ${
          treatment ? "text-[#111]" : "text-[#9a9a9a]"
        }`}
      >
        <option value="" disabled>
          Services
        </option>
        {TREATMENT_OPTIONS.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <Caret className="absolute right-5 h-1.5 w-2.5" />
    </div>
  );

  if (stacked) {
    return (
      <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
        {name}
        {phone}
        {email}

        <div className="space-y-2">
          <label htmlFor="enquiry-treatment" className="block text-[16px] font-bold text-[#1d4231]">
            Services
          </label>
          {services}
        </div>

        <div className="space-y-3 pt-2 text-center">
          {errorNote}
          <button
            type="submit"
            disabled={sending}
            className="rounded-full bg-[#1d4231] px-8 py-3 text-[16px] font-semibold text-white transition-colors hover:bg-[#163527] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {sending ? "Submitting…" : "Submit"}
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="mx-auto max-w-[1180px]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-5"
      >
        <div className="lg:flex-1">{name}</div>
        <div className="lg:flex-1">{email}</div>
        <div className="lg:flex-1">{phone}</div>
        <div className="lg:flex-1">{services}</div>

        <button
          type="submit"
          disabled={sending}
          className="h-[46px] shrink-0 rounded-full bg-[#d3b871] px-8 text-[16px] font-semibold text-[#1d4231] transition-colors hover:bg-[#c9a95d] disabled:cursor-not-allowed disabled:opacity-60 lg:w-auto"
        >
          {sending ? "Submitting…" : "Submit"}
        </button>
      </form>

      {errorNote && <div className="mt-3 text-center lg:text-left">{errorNote}</div>}
    </div>
  );
}
