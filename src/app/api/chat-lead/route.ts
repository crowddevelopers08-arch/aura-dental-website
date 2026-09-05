import { NextResponse } from "next/server";

/**
 * Where a completed chat conversation lands. Nothing is persisted yet — the
 * enquiry forms are in the same position (see `EnquiryForm.handleSubmit`), so
 * this is the one place to wire up a CRM, an email service or a webhook.
 */
export async function POST(request: Request) {
  let lead: unknown;
  try {
    lead = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  console.log("[chat lead]", lead);

  return NextResponse.json({ ok: true });
}
