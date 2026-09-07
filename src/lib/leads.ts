/**
 * Shared shape + validation for everything that writes a lead.
 *
 * Both the enquiry forms and the chat widget post here-ish, and they ask
 * overlapping-but-different questions, so this normalises one loose payload
 * into the columns `prisma/schema.prisma` actually has. Prisma accepts plain
 * string literals for enum columns, so the enums are declared here rather than
 * imported from the generated client — one less coupling to the codegen shape.
 */

export const LEAD_SOURCES = ["ENQUIRY_FORM", "CHAT_WIDGET"] as const;
export type LeadSource = (typeof LEAD_SOURCES)[number];

export const LEAD_STATUSES = ["NEW", "CONTACTED", "CONVERTED", "CLOSED"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const SOURCE_LABELS: Record<LeadSource, string> = {
  ENQUIRY_FORM: "Enquiry form",
  CHAT_WIDGET: "Chat widget",
};

export const STATUS_LABELS: Record<LeadStatus, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  CONVERTED: "Converted",
  CLOSED: "Closed",
};

export function isLeadStatus(v: unknown): v is LeadStatus {
  return typeof v === "string" && (LEAD_STATUSES as readonly string[]).includes(v);
}

export function isLeadSource(v: unknown): v is LeadSource {
  return typeof v === "string" && (LEAD_SOURCES as readonly string[]).includes(v);
}

/** What lands in the `leads` table. */
export type NormalisedLead = {
  name: string;
  email: string;
  phone: string;
  dialCode: string | null;
  country: string | null;
  location: string | null;
  treatment: string | null;
  source: LeadSource;
  pagePath: string | null;
};

export type ValidationResult =
  | { ok: true; lead: NormalisedLead }
  | { ok: false; errors: string[] };

/** Trim, collapse whitespace, and treat blank as absent. */
function str(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.replace(/\s+/g, " ").trim();
  return trimmed ? trimmed.slice(0, max) : null;
}

// Deliberately permissive: this is a clinic enquiry form, not an auth flow.
// Rejecting an unusual-but-real address loses a patient.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Accepts the payloads both front-ends already send. The enquiry form posts
 * `country` + `dial_code`; the chat widget posts `location` and no country.
 */
export function normaliseLead(input: unknown): ValidationResult {
  if (typeof input !== "object" || input === null) {
    return { ok: false, errors: ["Expected a JSON object."] };
  }

  const raw = input as Record<string, unknown>;
  const errors: string[] = [];

  const name = str(raw.name, 120);
  if (!name) errors.push("Name is required.");

  const email = str(raw.email, 200)?.toLowerCase() ?? null;
  if (!email) errors.push("Email is required.");
  else if (!EMAIL.test(email)) errors.push("Email address looks invalid.");

  const phone = str(raw.phone, 40);
  // Count digits rather than characters, so "+91 98765 43210" passes.
  if (!phone) errors.push("Phone number is required.");
  else if (phone.replace(/\D/g, "").length < 7) {
    errors.push("Phone number looks too short.");
  }

  if (errors.length) return { ok: false, errors };

  const source = isLeadSource(raw.source) ? raw.source : "ENQUIRY_FORM";

  // `dial_code` is the enquiry form's hidden input; `dialCode` is the API name.
  const dialCode = str(raw.dialCode ?? raw.dial_code, 8);

  return {
    ok: true,
    lead: {
      name: name!,
      email: email!,
      phone: phone!,
      dialCode,
      country: str(raw.country, 4)?.toUpperCase() ?? null,
      location: str(raw.location, 160),
      treatment: str(raw.treatment, 160),
      source,
      pagePath: str(raw.pagePath ?? raw.page_path, 200),
    },
  };
}

/** Full international number, for the Sheet and the dashboard's tel: link. */
export function displayPhone(lead: { dialCode: string | null; phone: string }): string {
  if (!lead.dialCode) return lead.phone;
  // Don't double up when the visitor typed the country code themselves.
  return lead.phone.startsWith("+") ? lead.phone : `${lead.dialCode} ${lead.phone}`;
}
