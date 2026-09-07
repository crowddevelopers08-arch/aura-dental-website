/* ============================================================
   Aura Dental — Google Apps Script (lead mirror)

   Accepts lead payloads from `src/lib/sheets.ts`:
     { timestamp, name, email, phone, location, treatment, source, page }

   `location` is only ever filled by the chat widget, which asks for a preferred
   clinic. The enquiry forms do not ask, so that column is blank on their rows.

   Rows are written by header name rather than fixed column position, so the
   clinic can add their own columns to the tab without breaking submissions.

   ── Setup ──────────────────────────────────────────────────
   1. Open the Google Sheet > Extensions > Apps Script.
   2. Paste this file over Code.gs and Save.
   3. Run `setupSheets` once and accept the permission prompt.
   4. Deploy > New deployment > Web app
        Execute as:      Me
        Who has access:  Anyone
   5. Copy the /exec URL into SHEETS_WEBHOOK_URL in .env (and in the Vercel
      project's environment variables).

   Re-deploy as a NEW VERSION after any edit, or the live URL keeps serving
   the old code.
   ============================================================ */

var LEAD_HEADERS = ['Timestamp', 'Name', 'Email', 'Phone', 'Location', 'Treatment Concern', 'Source', 'Page'];
var LEAD_WIDTHS  = [170, 170, 230, 140, 200, 240, 130, 180];

/**
 * Bumped by hand on every edit. Open the /exec URL in a browser: if the version
 * it reports is not this one, the Web App deployment is stale and real
 * submissions are still running older code, however current the editor looks.
 */
var SCRIPT_VERSION = '2026-09-07-c';

var DEFAULT_TAB = 'Aura Dental Leads';
var DEFAULT_HEADER_COLOR = '#1d4231';
var ZEBRA_COLOR = '#f6f4ef';
var BORDER_COLOR = '#e5dfd6';

function authorize() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log('Authorized: ' + ss.getName());
}

function doGet() {
  return _json({
    status: 'Aura Dental lead API is live',
    version: SCRIPT_VERSION,
    headers: LEAD_HEADERS
  });
}

function doPost(e) {
  // Two visitors can submit at the same moment. Without a lock both calls read
  // the same getLastRow() and one row overwrites the other.
  var lock = LockService.getScriptLock();

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return _json({ error: 'Empty request body' });
    }

    var data = JSON.parse(e.postData.contents);

    // Wait rather than fail — the caller in src/lib/sheets.ts allows 5s.
    if (!lock.tryLock(4000)) {
      return _json({ error: 'Sheet busy, lead not written' });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var ts = data.timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    var sheet = getOrCreateLeadSheet(ss, DEFAULT_TAB);
    var row = appendLeadRow(sheet, data, ts);

    // Force the append out before the lock drops.
    SpreadsheetApp.flush();

    return _json({ success: true, tab: DEFAULT_TAB, row: row });
  } catch (err) {
    return _json({ error: err.toString() });
  } finally {
    try { lock.releaseLock(); } catch (ignore) {}
  }
}

/**
 * Run this from the Apps Script editor to write one fake lead, without needing
 * the website. Check the tab, then delete the row.
 */
function testPost() {
  var res = doPost({
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        name: 'Test Patient',
        email: 'test@example.com',
        phone: '+91 98765 43210',
        location: 'Madinaguda, Hyderabad',
        treatment: 'Dental Implants / Teeth Implants',
        source: 'Enquiry form',
        page: '/dental-implants'
      })
    }
  });

  Logger.log(res.getContent());
}

/**
 * Adds any LEAD_HEADERS column the tab is missing, without touching existing
 * rows. Run once from the editor after adding a field; new submissions repair
 * the headers themselves, so this is only for fixing the sheet immediately.
 */
function repairHeaders() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = getOrCreateLeadSheet(ss, DEFAULT_TAB);

  var before = _readHeaders(sheet);
  var after = _ensureHeaders(sheet, LEAD_HEADERS, DEFAULT_HEADER_COLOR);
  SpreadsheetApp.flush();

  Logger.log('Before: ' + before.join(' | '));
  Logger.log('After:  ' + after.join(' | '));
}

function setupSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  if (!ss.getSheetByName(DEFAULT_TAB)) {
    createLeadSheet(ss, DEFAULT_TAB);
    Logger.log('Created: ' + DEFAULT_TAB);
  } else {
    Logger.log('OK: ' + DEFAULT_TAB);
  }

  Logger.log('setupSheets complete.');
}

function _json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * `appendRow` parses each value as though a person had typed it, so anything
 * beginning with = + - or @ is read as a formula. An Indian mobile arrives as
 * "+91 98765 43210", which is not valid formula syntax, so the cell showed
 * #ERROR! (Formula parse error) instead of the number.
 *
 * A leading apostrophe pins the cell to literal text. Sheets keeps it as a
 * formatting flag only — it is not displayed, and not returned by getValue()
 * or included in a CSV/Excel download.
 *
 * Applied to every visitor-supplied field, not just the phone: a name typed as
 * "=Kumar" or a treatment starting with "-" would break in exactly the same way.
 */
function _text(value) {
  var s = (value === null || value === undefined) ? '' : String(value);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function _styleHeader(sheet, colCount, bgColor) {
  sheet.getRange(1, 1, 1, colCount)
    .setBackground(bgColor || DEFAULT_HEADER_COLOR)
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setFontSize(11)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(1, 42);
}

function styleRow(sheet, rowIndex, colCount) {
  var row = sheet.getRange(rowIndex, 1, 1, colCount);
  row.setBackground(rowIndex % 2 === 0 ? ZEBRA_COLOR : '#ffffff')
    .setFontColor('#1a1c1b')
    .setFontSize(10)
    .setVerticalAlignment('middle')
    .setHorizontalAlignment('left');
  sheet.setRowHeight(rowIndex, 36);
  row.setBorder(false, false, true, false, false, false, BORDER_COLOR, SpreadsheetApp.BorderStyle.SOLID);
}

function _setWidths(sheet, widths) {
  widths.forEach(function (w, i) { sheet.setColumnWidth(i + 1, w); });
}

function _addFilter(sheet, colCount) {
  try {
    if (!sheet.getFilter()) sheet.getRange(1, 1, 1, colCount).createFilter();
  } catch (err) {
    Logger.log('Filter skipped on ' + sheet.getName() + ': ' + err);
  }
}

function _readHeaders(sheet) {
  var lastCol = sheet.getLastColumn();
  if (lastCol === 0) return [];
  return sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(function (h) {
    return String(h).trim();
  });
}

/**
 * Guarantees every column in `defaultHeaders` exists on the tab.
 *
 * Headers used to be written only when the tab was completely empty, so adding
 * a field to LEAD_HEADERS had no effect on a sheet that already had rows — the
 * value was matched by header name, found nothing, and was dropped without any
 * error. That is how Location went missing.
 *
 * A missing column is inserted in its documented position (immediately after
 * whichever earlier column is already present) rather than tacked onto the far
 * right, so a repaired sheet still reads in the intended order. Columns the
 * clinic added themselves are never touched.
 */
function _ensureHeaders(sheet, defaultHeaders, headerColor) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(defaultHeaders);
    _styleHeader(sheet, defaultHeaders.length, headerColor);
    sheet.setFrozenRows(1);
    return defaultHeaders.slice();
  }

  var headers = _readHeaders(sheet);
  var added = false;

  for (var i = 0; i < defaultHeaders.length; i++) {
    var name = defaultHeaders[i];
    if (headers.indexOf(name) !== -1) continue;

    // Walk back through the columns that should precede this one and slot in
    // after the first that actually exists. If none do, nothing precedes it,
    // so it belongs at the front rather than tacked onto the far right.
    var at = 0;
    for (var j = i - 1; j >= 0; j--) {
      var prev = headers.indexOf(defaultHeaders[j]);
      if (prev !== -1) { at = prev + 2; break; }
    }
    if (at === 0) at = 1;

    var lastCol = sheet.getLastColumn();
    if (at > lastCol) {
      sheet.insertColumnAfter(lastCol);
      at = lastCol + 1;
    } else {
      sheet.insertColumnBefore(at);
    }

    sheet.getRange(1, at).setValue(name);
    if (LEAD_WIDTHS[i]) sheet.setColumnWidth(at, LEAD_WIDTHS[i]);

    headers.splice(at - 1, 0, name);
    added = true;
  }

  if (added) _styleHeader(sheet, headers.length, headerColor);

  return headers;
}

function _appendByHeaders(sheet, valueMap, defaultHeaders, headerColor) {
  var headers = _ensureHeaders(sheet, defaultHeaders, headerColor);

  var row = headers.map(function (h) {
    return Object.prototype.hasOwnProperty.call(valueMap, h) ? valueMap[h] : '';
  });

  var nextRow = sheet.getLastRow() + 1;
  sheet.appendRow(row);
  styleRow(sheet, nextRow, headers.length);

  return { row: nextRow, headers: headers };
}

function _centerColumns(sheet, headers, rowIndex, names) {
  names.forEach(function (name) {
    var idx = headers.indexOf(name);
    if (idx !== -1) sheet.getRange(rowIndex, idx + 1).setHorizontalAlignment('center');
  });
}

function createLeadSheet(ss, tabName) {
  var sheet = ss.insertSheet(tabName);
  sheet.appendRow(LEAD_HEADERS);
  _styleHeader(sheet, LEAD_HEADERS.length, DEFAULT_HEADER_COLOR);
  _setWidths(sheet, LEAD_WIDTHS);
  sheet.setFrozenRows(1);
  _addFilter(sheet, LEAD_HEADERS.length);
  return sheet;
}

function getOrCreateLeadSheet(ss, tabName) {
  return ss.getSheetByName(tabName) || createLeadSheet(ss, tabName);
}

function appendLeadRow(sheet, data, ts) {
  var result = _appendByHeaders(sheet, {
    'Timestamp': ts,
    'Name': _text(data.name),
    'Email': _text(data.email),
    'Phone': _text(data.phone),
    'Location': _text(data.location),
    'Treatment Concern': _text(data.treatment),
    'Source': _text(data.source),
    'Page': _text(data.page)
  }, LEAD_HEADERS, DEFAULT_HEADER_COLOR);

  _centerColumns(sheet, result.headers, result.row, ['Phone']);
  return result.row;
}
