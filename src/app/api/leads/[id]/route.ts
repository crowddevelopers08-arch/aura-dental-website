import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isLeadStatus, type LeadStatus } from "@/lib/leads";

export const dynamic = "force-dynamic";

/** Status and notes edits from the dashboard row controls. */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const body = payload as { status?: unknown; notes?: unknown };
  // The literal union, not `string` — Prisma's enum column will not take a
  // widened string.
  const data: { status?: LeadStatus; notes?: string | null } = {};

  if (body.status !== undefined) {
    if (!isLeadStatus(body.status)) {
      return NextResponse.json({ ok: false, error: "Unknown status." }, { status: 400 });
    }
    data.status = body.status;
  }

  if (body.notes !== undefined) {
    data.notes = typeof body.notes === "string" ? body.notes.slice(0, 2000) : null;
  }

  if (!Object.keys(data).length) {
    return NextResponse.json({ ok: false, error: "Nothing to update." }, { status: 400 });
  }

  try {
    const lead = await prisma.lead.update({ where: { id }, data });
    return NextResponse.json({ ok: true, status: lead.status });
  } catch {
    return NextResponse.json({ ok: false, error: "Lead not found." }, { status: 404 });
  }
}
