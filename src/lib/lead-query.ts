import type { Prisma } from "@prisma/client";
import { isLeadSource, isLeadStatus, type LeadSource, type LeadStatus } from "@/lib/leads";

/**
 * The dashboard's filter state, parsed once and reused by both the page and the
 * Excel export so a download always matches exactly what is on screen.
 */
export type LeadFilters = {
  q: string;
  source: LeadSource | null;
  status: LeadStatus | null;
  from: Date | null;
  to: Date | null;
  page: number;
};

export const PAGE_SIZE = 25;

/** Accepts Next's `searchParams` or a `URLSearchParams`. */
export function parseFilters(
  input: Record<string, string | string[] | undefined> | URLSearchParams
): LeadFilters {
  const get = (key: string): string => {
    if (input instanceof URLSearchParams) return input.get(key) ?? "";
    const v = input[key];
    return (Array.isArray(v) ? v[0] : v) ?? "";
  };

  const source = get("source");
  const status = get("status");

  // A bare yyyy-mm-dd parses as UTC midnight, which is the start of that day.
  const from = get("from") ? new Date(`${get("from")}T00:00:00.000Z`) : null;
  // `to` is inclusive, so run it to the end of the chosen day.
  const to = get("to") ? new Date(`${get("to")}T23:59:59.999Z`) : null;

  const page = Number.parseInt(get("page"), 10);

  return {
    q: get("q").trim().slice(0, 100),
    source: isLeadSource(source) ? source : null,
    status: isLeadStatus(status) ? status : null,
    from: from && !Number.isNaN(from.valueOf()) ? from : null,
    to: to && !Number.isNaN(to.valueOf()) ? to : null,
    page: Number.isFinite(page) && page > 0 ? page : 1,
  };
}

export function buildWhere(filters: LeadFilters): Prisma.LeadWhereInput {
  const and: Prisma.LeadWhereInput[] = [];

  if (filters.q) {
    and.push({
      OR: [
        { name: { contains: filters.q, mode: "insensitive" } },
        { email: { contains: filters.q, mode: "insensitive" } },
        { phone: { contains: filters.q } },
        { treatment: { contains: filters.q, mode: "insensitive" } },
        { location: { contains: filters.q, mode: "insensitive" } },
      ],
    });
  }

  if (filters.source) and.push({ source: filters.source });
  if (filters.status) and.push({ status: filters.status });

  if (filters.from || filters.to) {
    and.push({
      createdAt: {
        ...(filters.from ? { gte: filters.from } : {}),
        ...(filters.to ? { lte: filters.to } : {}),
      },
    });
  }

  return and.length ? { AND: and } : {};
}

/** Rebuilds the querystring with one value changed — for filter links. */
export function withParam(
  current: LeadFilters,
  patch: Partial<Record<"q" | "source" | "status" | "from" | "to" | "page", string>>
): string {
  const params = new URLSearchParams();
  const iso = (d: Date | null) => (d ? d.toISOString().slice(0, 10) : "");

  const base: Record<string, string> = {
    q: current.q,
    source: current.source ?? "",
    status: current.status ?? "",
    from: iso(current.from),
    to: iso(current.to),
    // Any filter change resets paging; callers pass an explicit page to keep it.
    page: "",
  };

  for (const [key, value] of Object.entries({ ...base, ...patch })) {
    if (value) params.set(key, value);
  }

  const qs = params.toString();
  return qs ? `/dashboard?${qs}` : "/dashboard";
}
