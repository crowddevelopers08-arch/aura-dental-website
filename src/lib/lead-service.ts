import { prisma } from "@/lib/prisma";
import { normaliseLead } from "@/lib/leads";
import { mirrorToSheet } from "@/lib/sheets";

/**
 * The one path a lead takes, shared by `/api/leads` and `/api/chat-lead`.
 *
 * Order matters: Neon first, Sheet second. The database write is what must
 * succeed; the Sheet mirror is best-effort and only flips a flag.
 */
export type CreateLeadResult =
  | { ok: true; id: string; syncedToSheet: boolean }
  | { ok: false; status: 400 | 500; errors: string[] };

export async function createLead(payload: unknown): Promise<CreateLeadResult> {
  const parsed = normaliseLead(payload);

  if (!parsed.ok) {
    return { ok: false, status: 400, errors: parsed.errors };
  }

  let created;
  try {
    created = await prisma.lead.create({ data: parsed.lead });
  } catch (err) {
    console.error("[leads] database write failed:", err);
    return {
      ok: false,
      status: 500,
      errors: ["Could not save your enquiry. Please try again or call the clinic."],
    };
  }

  // Past this point the lead is safe, so nothing below may throw.
  const syncedToSheet = await mirrorToSheet(parsed.lead, created.createdAt);

  if (syncedToSheet) {
    try {
      await prisma.lead.update({
        where: { id: created.id },
        data: { syncedToSheet: true },
      });
    } catch (err) {
      // Cosmetic only — the row is in both places, the flag just lags.
      console.error("[leads] could not flag sheet sync:", err);
    }
  }

  return { ok: true, id: created.id, syncedToSheet };
}
