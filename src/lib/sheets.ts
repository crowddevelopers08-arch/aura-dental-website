import { displayPhone, SOURCE_LABELS, type NormalisedLead } from "@/lib/leads";

/**
 * Mirrors each lead into the clinic's Google Sheet via the Apps Script Web App
 * in `docs/aura-leads-apps-script.gs`.
 *
 * The Sheet is a convenience copy, never the record of truth — Neon is. So a
 * failure here is swallowed and reported as `false` rather than thrown: the
 * lead is already saved, and the dashboard shows an "unsynced" marker so
 * nothing goes quietly missing.
 */

/** IST, matching how the clinic reads the sheet. */
export function istTimestamp(date = new Date()): string {
  return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
}

// Apps Script cold-starts can take a couple of seconds. Past this we give up
// rather than keep the visitor's form spinner going.
const TIMEOUT_MS = 5000;

export async function mirrorToSheet(
  lead: NormalisedLead,
  createdAt: Date
): Promise<boolean> {
  const url = process.env.SHEETS_WEBHOOK_URL;

  // Not configured is a valid state, not an error — Neon still has the lead.
  if (!url) return false;

  const payload = {
    timestamp: istTimestamp(createdAt),
    name: lead.name,
    email: lead.email,
    phone: displayPhone(lead),
    // Chat widget only — the enquiry forms never ask, so this is often blank.
    location: lead.location ?? "",
    treatment: lead.treatment ?? "",
    source: SOURCE_LABELS[lead.source],
    page: lead.pagePath ?? "",
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // Apps Script /exec 302-redirects to googleusercontent.com; fetch follows.
      redirect: "follow",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!res.ok) {
      console.error("[sheets] HTTP %d from Apps Script", res.status);
      return false;
    }

    // Apps Script returns 200 with a JSON body even for handled errors.
    const body = (await res.json()) as { success?: boolean; error?: string };
    if (body.error) {
      console.error("[sheets] Apps Script error:", body.error);
      return false;
    }

    return body.success === true;
  } catch (err) {
    console.error("[sheets] mirror failed:", err);
    return false;
  }
}
