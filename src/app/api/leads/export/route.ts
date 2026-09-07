import ExcelJS from "exceljs";
import { prisma } from "@/lib/prisma";
import { buildWhere, parseFilters } from "@/lib/lead-query";
import { displayPhone, SOURCE_LABELS, STATUS_LABELS, type LeadSource, type LeadStatus } from "@/lib/leads";
import { istTimestamp } from "@/lib/sheets";

export const dynamic = "force-dynamic";

/** Mirrors the Sheet's column order so the two exports read the same. */
const COLUMNS: { header: string; width: number }[] = [
  { header: "Timestamp", width: 22 },
  { header: "Name", width: 24 },
  { header: "Email", width: 30 },
  { header: "Phone", width: 20 },
  { header: "Location", width: 26 },
  { header: "Treatment Concern", width: 30 },
  { header: "Source", width: 16 },
  { header: "Status", width: 14 },
  { header: "Page", width: 26 },
];

const BRAND_GREEN = "FF1D4231";
const ZEBRA = "FFF6F4EF";

/**
 * Streams the current dashboard selection as a real .xlsx. The filters come
 * from the same parser the page uses, so "Download Excel" always matches the
 * rows on screen rather than dumping the whole table.
 */
export async function GET(request: Request) {
  const filters = parseFilters(new URL(request.url).searchParams);

  const leads = await prisma.lead.findMany({
    where: buildWhere(filters),
    orderBy: { createdAt: "desc" },
    // Exports are deliberately uncapped by page, but bounded so a runaway
    // table can't blow the function's memory.
    take: 10_000,
  });

  const book = new ExcelJS.Workbook();
  book.creator = "Aura Dental";
  book.created = new Date();

  const sheet = book.addWorksheet("Aura Dental Leads", {
    views: [{ state: "frozen", ySplit: 1 }],
  });

  sheet.columns = COLUMNS.map((c) => ({ header: c.header, width: c.width }));

  const header = sheet.getRow(1);
  header.height = 28;
  header.font = { bold: true, size: 11, color: { argb: "FFFFFFFF" } };
  header.alignment = { vertical: "middle", horizontal: "center" };
  header.eachCell((cell) => {
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: BRAND_GREEN } };
  });

  for (const lead of leads) {
    const row = sheet.addRow([
      istTimestamp(lead.createdAt),
      lead.name,
      lead.email,
      displayPhone(lead),
      lead.location ?? "",
      lead.treatment ?? "",
      SOURCE_LABELS[lead.source as LeadSource] ?? lead.source,
      STATUS_LABELS[lead.status as LeadStatus] ?? lead.status,
      lead.pagePath ?? "",
    ]);

    row.height = 20;
    row.alignment = { vertical: "middle" };
    if (row.number % 2 === 0) {
      row.eachCell((cell) => {
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: ZEBRA } };
      });
    }
  }

  sheet.autoFilter = { from: "A1", to: { row: 1, column: COLUMNS.length } };

  const buffer = await book.xlsx.writeBuffer();
  const stamp = new Date().toISOString().slice(0, 10);

  return new Response(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="aura-dental-leads-${stamp}.xlsx"`,
      "Cache-Control": "no-store",
    },
  });
}
