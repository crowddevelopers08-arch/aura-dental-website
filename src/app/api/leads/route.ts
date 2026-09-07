import { NextResponse } from "next/server";
import { createLead } from "@/lib/lead-service";

/** Lead capture runs per-request; nothing here may be cached or prerendered. */
export const dynamic = "force-dynamic";

/**
 * Where `EnquiryForm` submits. Saves to Neon, then mirrors to Google Sheets.
 * The chat widget posts the same shape to `/api/chat-lead`.
 */
export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, errors: ["Invalid JSON."] }, { status: 400 });
  }

  const result = await createLead(payload);

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, errors: result.errors },
      { status: result.status }
    );
  }

  return NextResponse.json(
    { ok: true, id: result.id, syncedToSheet: result.syncedToSheet },
    { status: 201 }
  );
}
