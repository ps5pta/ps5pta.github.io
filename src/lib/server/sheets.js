import { GoogleAuth } from 'google-auth-library';
import { env } from '$env/dynamic/private';

import HomeFallback from './fallback/Home.json';
import ClubsFallback from './fallback/Clubs.json';
import FundraisingFallback from './fallback/Fundraising.json';
import BeforeAfterSchoolFallback from './fallback/BeforeAfterSchool.json';
import GeneralInfoFallback from './fallback/GeneralInfo.json';
import DonateFallback from './fallback/Donate.json';

// Statically imported (not read via fs) so Vite bundles these correctly
// regardless of how the server code gets chunked at build time.
const FALLBACKS = {
	Home: HomeFallback,
	Clubs: ClubsFallback,
	Fundraising: FundraisingFallback,
	BeforeAfterSchool: BeforeAfterSchoolFallback,
	GeneralInfo: GeneralInfoFallback,
	Donate: DonateFallback
};

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

/** Fetches raw A2:D rows for a tab (row 1 is the key/label/value/notes header). */
async function fetchTabRows(tabName) {
	const auth = getAuth();
	const sheetId = env.CONTENT_SHEET_ID;
	if (!auth || !sheetId) return null;

	const client = await auth.getClient();
	const token = await client.getAccessToken();
	const range = encodeURIComponent(`${tabName}!A2:D1000`);
	const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}`;

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
 * Returns a flat { key: value } dictionary for one page's content tab.
 * Falls back to a committed JSON fixture when Sheets credentials aren't configured
 * (e.g. local dev without secrets).
 */
export async function getPageContent(tabName) {
	const rows = await fetchTabRows(tabName);
	if (rows === null) return FALLBACKS[tabName] ?? {};
	return rowsToDict(rows);
}
