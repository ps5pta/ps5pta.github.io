#!/usr/bin/env node
/**
 * One-time (or re-run-anytime) script that populates the live Google Sheet
 * from the committed fallback JSON fixtures in src/lib/server/fallback/.
 *
 * Usage:
 *   node scripts/seed-sheet.mjs --key /path/to/service-account.json --sheet-id <SHEET_ID>
 * or via env vars:
 *   SERVICE_ACCOUNT_KEY_PATH=/path/to/key.json CONTENT_SHEET_ID=<id> node scripts/seed-sheet.mjs
 *
 * Two tab formats:
 *   - DICT tabs: key/label/value/notes rows (one page-level field per row).
 *   - TABLE tabs: a header row (e.g. Section/Image/Heading/Text) followed by
 *     one row per item — the fallback fixture is an array of objects.
 * Both are (re-)written in full — this seeds the sheet, it doesn't merge with
 * manual edits made since.
 */
import { GoogleAuth } from 'google-auth-library';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FALLBACK_DIR = path.join(__dirname, '..', 'src', 'lib', 'server', 'fallback');

const DICT_TABS = ['Home', 'Clubs', 'Fundraising', 'BeforeAfterSchool', 'GeneralInfo', 'Donate'];
const TABLE_TABS = {
	ClubsCards: ['section', 'image', 'heading', 'text'],
	BoardMembers: ['group', 'role', 'name'],
	Donors: ['label', 'image', 'href'],
	FundraisingPartners: ['heading', 'text', 'href', 'button']
};

const ALL_TABS = [...DICT_TABS, ...Object.keys(TABLE_TABS)];

function parseArgs() {
	const args = process.argv.slice(2);
	const get = (flag) => {
		const i = args.indexOf(flag);
		return i === -1 ? undefined : args[i + 1];
	};
	return {
		keyPath: get('--key') ?? process.env.SERVICE_ACCOUNT_KEY_PATH,
		sheetId: get('--sheet-id') ?? process.env.CONTENT_SHEET_ID
	};
}

/** Turns `whatWeDo.bullet[0]` into a readable "What We Do Bullet 0". */
function humanize(key) {
	return key
		.replace(/\[(\d+)\]/g, ' $1')
		.replace(/\./g, ' ')
		.replace(/([a-z])([A-Z])/g, '$1 $2')
		.split(/\s+/)
		.filter(Boolean)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

async function getAuthedFetch(keyPath) {
	const credentials = JSON.parse(fs.readFileSync(keyPath, 'utf-8'));
	const auth = new GoogleAuth({
		credentials,
		scopes: ['https://www.googleapis.com/auth/spreadsheets']
	});
	const client = await auth.getClient();
	return async (url, options = {}) => {
		const token = await client.getAccessToken();
		const res = await fetch(url, {
			...options,
			headers: {
				...options.headers,
				Authorization: `Bearer ${token.token}`,
				'Content-Type': 'application/json'
			}
		});
		if (!res.ok) {
			throw new Error(`${options.method ?? 'GET'} ${url} -> ${res.status}: ${await res.text()}`);
		}
		return res.json();
	};
}

async function ensureTabsExist(authedFetch, sheetId, existingTitles) {
	const missing = ALL_TABS.filter((t) => !existingTitles.includes(t));
	if (missing.length === 0) return;

	console.log(`Creating missing tabs: ${missing.join(', ')}`);
	await authedFetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}:batchUpdate`, {
		method: 'POST',
		body: JSON.stringify({
			requests: missing.map((title) => ({ addSheet: { properties: { title } } }))
		})
	});
}

async function writeValues(authedFetch, sheetId, tabName, rows) {
	// Clear the whole tab first — a plain values.update PUT only overwrites the
	// cells it targets, so a shrinking tab (fewer rows than last time) would
	// otherwise leave old rows behind as dead orphans.
	const clearRange = encodeURIComponent(`${tabName}!A1:Z10000`);
	await authedFetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${clearRange}:clear`, {
		method: 'POST'
	});

	const range = encodeURIComponent(`${tabName}!A1`);
	await authedFetch(
		`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?valueInputOption=RAW`,
		{
			method: 'PUT',
			body: JSON.stringify({ values: rows })
		}
	);
	console.log(`Wrote ${rows.length - 1} rows to "${tabName}"`);
}

async function writeDictTab(authedFetch, sheetId, tabName) {
	const fixturePath = path.join(FALLBACK_DIR, `${tabName}.json`);
	const content = JSON.parse(fs.readFileSync(fixturePath, 'utf-8'));

	const rows = [
		['key', 'label', 'value', 'notes'],
		...Object.entries(content).map(([key, value]) => [key, humanize(key), value, ''])
	];
	await writeValues(authedFetch, sheetId, tabName, rows);
}

async function writeTableTab(authedFetch, sheetId, tabName, columns) {
	const fixturePath = path.join(FALLBACK_DIR, `${tabName}.json`);
	const items = JSON.parse(fs.readFileSync(fixturePath, 'utf-8'));

	const headerLabels = columns.map((c) => c.charAt(0).toUpperCase() + c.slice(1));
	const rows = [headerLabels, ...items.map((item) => columns.map((c) => item[c] ?? ''))];
	await writeValues(authedFetch, sheetId, tabName, rows);
}

async function main() {
	const { keyPath, sheetId } = parseArgs();
	if (!keyPath || !sheetId) {
		console.error('Usage: node scripts/seed-sheet.mjs --key <path-to-json-key> --sheet-id <sheet-id>');
		process.exit(1);
	}

	const authedFetch = await getAuthedFetch(keyPath);

	const meta = await authedFetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}`);
	const existingTitles = meta.sheets.map((s) => s.properties.title);

	await ensureTabsExist(authedFetch, sheetId, existingTitles);

	for (const tab of DICT_TABS) {
		await writeDictTab(authedFetch, sheetId, tab);
	}
	for (const [tab, columns] of Object.entries(TABLE_TABS)) {
		await writeTableTab(authedFetch, sheetId, tab, columns);
	}

	console.log('\nDone. Sheet is seeded with current site content.');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
