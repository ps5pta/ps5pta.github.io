import { GoogleAuth } from 'google-auth-library';
import { env } from '$env/dynamic/private';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

let authClient;

/** Lazily builds a JWT auth client from the GOOGLE_SERVICE_ACCOUNT_KEY env var. */
function getAuth() {
	if (!env.GOOGLE_SERVICE_ACCOUNT_KEY) return null;
	if (!authClient) {
		const credentials = JSON.parse(env.GOOGLE_SERVICE_ACCOUNT_KEY);
		authClient = new GoogleAuth({ credentials, scopes: SCOPES });
	}
	return authClient;
}

async function fetchRange(tabName, range) {
	const auth = getAuth();
	const sheetId = env.CONTENT_SHEET_ID;
	if (!auth || !sheetId) {
		throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY and CONTENT_SHEET_ID must be set to load site content.');
	}

	const client = await auth.getClient();
	const token = await client.getAccessToken();
	const encodedRange = encodeURIComponent(`${tabName}!${range}`);
	const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodedRange}`;

	const res = await fetch(url, {
		headers: { Authorization: `Bearer ${token.token}` }
	});
	if (!res.ok) {
		throw new Error(`Sheets API error for tab "${tabName}": ${res.status} ${await res.text()}`);
	}
	const data = await res.json();
	return data.values ?? [];
}

function rowsToDict(rows) {
	/** @type {Record<string, string>} */
	const dict = {};
	for (const row of rows) {
		const [key, , value] = row;
		if (key) dict[key.trim()] = (value ?? '').trim();
	}
	return dict;
}

/**
 * Returns a flat { key: value } dictionary for a key/label/value/notes-style tab.
 */
export async function getPageContent(tabName) {
	const rows = await fetchRange(tabName, 'A2:D1000');
	return rowsToDict(rows);
}

/**
 * Returns an array of row objects for a generic "one row per item" tab.
 * Row 1 must be a header row; each subsequent non-blank row becomes an object
 * keyed by lowercased header names (e.g. header "Section" -> row.section).
 */
export async function getCardRows(tabName) {
	const rows = await fetchRange(tabName, 'A1:Z1000');
	if (rows.length === 0) return [];

	const headers = rows[0].map((h) => h.trim().toLowerCase());
	return rows
		.slice(1)
		.filter((row) => row.some((cell) => cell && cell.trim()))
		.map((row) => {
			/** @type {Record<string, string>} */
			const obj = {};
			headers.forEach((h, i) => {
				obj[h] = (row[i] ?? '').trim();
			});
			return obj;
		});
}
