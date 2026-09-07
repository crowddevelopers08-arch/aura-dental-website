import { NextResponse } from "next/server";
import { createLead } from "@/lib/lead-service";

export const dynamic = "force-dynamic";

/**
 * Where a completed chat conversation lands. `ChatWidget` posts the raw answer
 * map — `{ treatment, name, email, phone, location }` — with no source field,
 * so this route stamps one before handing off to the shared writer.
 *
 * The widget fires this without awaiting the response, so a non-2xx here is
 * invisible to the visitor by design: they have already been thanked.
 */
export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, errors: ["Invalid JSON."] }, { status: 400 });
  }

  const result = await createLead({
    ...(payload as Record<string, unknown>),
    source: "CHAT_WIDGET",
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, errors: result.errors },
      { status: result.status }
    );
  }

  return NextResponse.json({ ok: true, id: result.id }, { status: 201 });
}
