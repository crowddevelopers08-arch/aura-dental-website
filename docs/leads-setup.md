# Leads: dashboard, Neon database, Google Sheets

Every enquiry now lands in Postgres (Neon) and is mirrored into a Google Sheet.
`/dashboard` reads the database and can export the current selection as `.xlsx`.

## How a lead flows

```
EnquiryForm  ──POST /api/leads──────┐
(home, /contact, service pages)     │
                                    ├─► createLead()  ─► Neon (source of truth)
ChatWidget   ──POST /api/chat-lead──┘        │
                                             └─► Apps Script ─► Google Sheet
                                                 (best effort)
```

Neon is the record of truth. If the Sheet mirror fails the lead is still saved,
`synced_to_sheet` stays `false`, and the dashboard shows a **Not in sheet**
marker on that row plus a count in the header — so a broken webhook is visible
instead of silent.

## 1. Neon

From the Neon console → your project → **Connection Details**, copy both strings
into `.env` (start from `.env.example`):

| Variable | Which host | Used by |
|---|---|---|
| `DATABASE_URL` | **pooled** — contains `-pooler` | the running app |
| `DIRECT_URL` | **direct** — no `-pooler` | `prisma migrate` only |

Keep `?sslmode=require` on both. Migrations must not go through PgBouncer,
which is why there are two.

Then create the table:

```bash
npx prisma migrate deploy
```

The initial migration is already written (`prisma/migrations/0_init/`), so this
is the only command needed. Verify with `npm run db:studio`.

On Vercel, add `DATABASE_URL`, `DIRECT_URL` and `SHEETS_WEBHOOK_URL` under
Project → Settings → Environment Variables. `npm run build` runs
`prisma generate` first, so the client is always in step with the schema.

## 2. Google Sheet

1. Create the Sheet → **Extensions → Apps Script**.
2. Paste [`aura-leads-apps-script.gs`](aura-leads-apps-script.gs) over `Code.gs`, save.
3. Run `setupSheets` once and accept the permission prompt.
4. **Deploy → New deployment → Web app**, `Execute as: Me`,
   `Who has access: Anyone`.
5. Put the `/exec` URL in `SHEETS_WEBHOOK_URL`.

Leaving `SHEETS_WEBHOOK_URL` blank disables the mirror cleanly — leads still
save to Neon.

> After editing the script, deploy a **new version**. The live `/exec` URL keeps
> serving the old code otherwise.

## 3. The dashboard

`/dashboard` — KPI tiles, a 30-day trend, and a filterable table.

- **Filters** (search, source, status, date range) live in the URL, so a view is
  a shareable link and the page works without JavaScript.
- **Status** is editable inline on each row; the change is optimistic and
  reverts if the request fails.
- **Download Excel** exports exactly the current filter selection — not just the
  visible page — via `/api/leads/export`, capped at 10,000 rows.

### No authentication

The dashboard is currently unguarded, as requested. Anyone with the URL can read
lead PII. It carries `robots: noindex` so it stays out of search results, but
that is not access control.

To add a password later, nothing in the page needs rewriting — add
`src/middleware.ts` matching `/dashboard/:path*` and `/api/leads/:path*`, check a
signed cookie, and redirect to a small login route.

## API

| Route | Method | Purpose |
|---|---|---|
| `/api/leads` | POST | Enquiry-form submissions |
| `/api/chat-lead` | POST | Chat-widget submissions (stamps `CHAT_WIDGET`) |
| `/api/leads/[id]` | PATCH | Update `status` / `notes` |
| `/api/leads/export` | GET | `.xlsx` of the current filter selection |

Validation lives in [`src/lib/leads.ts`](../src/lib/leads.ts) and is deliberately
permissive — this is a clinic enquiry form, and rejecting an unusual-but-real
address loses a patient.
