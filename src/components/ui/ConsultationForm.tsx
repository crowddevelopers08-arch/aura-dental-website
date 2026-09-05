"use client";

import { useState } from "react";
import { COUNTRIES, DEFAULT_COUNTRY_ISO, countryLabel } from "@/data/countries";
import { TREATMENT_OPTIONS } from "@/data/site";

type Props = {
  /** "light" sits on the grey/white bands, "dark" sits on the deep-green band. */
  tone?: "light" | "dark";
  submitLabel?: string;
  showMessage?: boolean;
};

const FIELD =
  "w-full rounded-[10px] border border-[#d2d2d2] bg-white px-4 py-3 text-[15px] text-[#111] outline-none transition-colors placeholder:text-[#8a8a8a] focus:border-[#1d4231]";

export default function ConsultationForm({
  tone = "light",
  submitLabel = "Submit",
  showMessage = true,
}: Props) {
  const [sent, setSent] = useState(false);
  const [iso, setIso] = useState(DEFAULT_COUNTRY_ISO);
  const labelColor = tone === "dark" ? "text-white" : "text-[#1d4231]";

  // Keyed on ISO, not dial code — US and CA both dial +1.
  const dial = COUNTRIES.find((c) => c.iso === iso)?.dial ?? "+91";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // The source site posts to HubSpot. Wire this up to your own endpoint/CRM.
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-[16px] border border-[#d3b871] bg-white p-6 md:p-8 text-center">
        <h3 className="text-[26px] font-bold text-[#1d4231]">Thank you!</h3>
        <p className="mt-2 text-[16px] text-[#444]">
          Your request has been received. Our team will reach out to confirm your free
          consultation shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="firstname" className={`mb-1.5 block text-[14px] font-semibold ${labelColor}`}>
          First name<span className="text-[#c0392b]">*</span>
        </label>
        <input id="firstname" name="firstname" required placeholder="First name" className={FIELD} />
      </div>

      <div>
        <label htmlFor="lastname" className={`mb-1.5 block text-[14px] font-semibold ${labelColor}`}>
          Last name
        </label>
        <input id="lastname" name="lastname" placeholder="Last name" className={FIELD} />
      </div>

      <div>
        <label htmlFor="email" className={`mb-1.5 block text-[14px] font-semibold ${labelColor}`}>
          Email<span className="text-[#c0392b]">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className={FIELD}
        />
      </div>

      <div>
        <label htmlFor="phone" className={`mb-1.5 block text-[14px] font-semibold ${labelColor}`}>
          Phone number<span className="text-[#c0392b]">*</span>
        </label>
        <div className="flex">
          <span className="relative flex items-center gap-1.5 rounded-l-[10px] border border-r-0 border-[#d2d2d2] bg-[#f2f2f2] px-3 text-[15px] text-[#111]">
            {/* Transparent native select over the visible code, so the closed
                control stays compact while the open list is the platform's. */}
            <span aria-hidden="true">{dial}</span>
            <svg viewBox="0 0 10 6" aria-hidden="true" className="h-1.5 w-2.5 shrink-0 fill-[#333]">
              <path d="M0 0h10L5 6z" />
            </svg>
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
          <input type="hidden" name="dial_code" value={dial} />
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="Phone number"
            className={`${FIELD} rounded-l-none`}
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="treatment" className={`mb-1.5 block text-[14px] font-semibold ${labelColor}`}>
          Treatment you are looking for
        </label>
        <select id="treatment" name="treatment" defaultValue="" className={FIELD}>
          <option value="" disabled>
            Please Select
          </option>
          {TREATMENT_OPTIONS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {showMessage && (
        <div className="sm:col-span-2">
          <label htmlFor="message" className={`mb-1.5 block text-[14px] font-semibold ${labelColor}`}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Tell us how we can help"
            className={`${FIELD} resize-y`}
          />
        </div>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          className="rounded-[20px] bg-[#d3b871] px-7 py-2.5 text-[16px] font-semibold text-[#1d4231] transition-colors hover:bg-[#c9a95d]"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
