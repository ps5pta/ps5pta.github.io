/**
 * Pulls a repeating group out of a flat content dict.
 * Keys are expected in the form `prefix[0].field`, `prefix[1].field`, ...
 * Returns an ordered array of { field: value } objects.
 *
 * @param {Record<string, string>} content
 * @param {string} prefix
 */
export function pluckIndexed(content, prefix) {
	const escaped = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const re = new RegExp(`^${escaped}\\[(\\d+)\\]\\.(.+)$`);
	const result = [];
	for (const [key, value] of Object.entries(content)) {
		const match = key.match(re);
		if (!match) continue;
		const [, indexStr, field] = match;
		const index = Number(indexStr);
		result[index] = result[index] || {};
		result[index][field] = value;
	}
	return result.filter(Boolean);
}

/**
 * Pulls a simple repeating list of plain string values out of a flat content dict.
 * Keys are expected in the form `prefix[0]`, `prefix[1]`, ...
 *
 * @param {Record<string, string>} content
 * @param {string} prefix
 */
export function pluckList(content, prefix) {
	const escaped = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const re = new RegExp(`^${escaped}\\[(\\d+)\\]$`);
	const result = [];
	for (const [key, value] of Object.entries(content)) {
		const match = key.match(re);
		if (!match) continue;
		result[Number(match[1])] = value;
	}
	return result.filter((v) => v !== undefined);
}

/**
 * Groups an array of row objects by a field, preserving the order each
 * group's key first appears in.
 *
 * @param {Record<string, string>[]} rows
 * @param {string} field
 * @returns {{ key: string, items: Record<string, string>[] }[]}
 */
export function groupBy(rows, field) {
	const order = [];
	/** @type {Record<string, Record<string, string>[]>} */
	const groups = {};

	for (const row of rows) {
		const key = row[field] || 'General';
		if (!groups[key]) {
			groups[key] = [];
			order.push(key);
		}
		groups[key].push(row);
	}

	return order.map((key) => ({ key, items: groups[key] }));
}

/**
 * Groups an array of card rows by a field (default "section"), preserving the
 * order each section first appears in. Cards with a blank heading are treated
 * as a section's intro/lead text rather than an actual card.
 *
 * @param {Record<string, string>[]} cards
 * @param {string} field
 * @returns {{ section: string, leads: Record<string, string>[], items: Record<string, string>[] }[]}
 */
export function groupBySection(cards, field = 'section') {
	return groupBy(cards, field).map(({ key, items }) => ({
		section: key,
		leads: items.filter((c) => !c.heading),
		items: items.filter((c) => c.heading)
	}));
}

/**
 * Extracts a file ID from any common Google Drive share link shape:
 *   .../file/d/FILE_ID/view?usp=...
 *   drive.google.com/open?id=FILE_ID
 *   drive.google.com/uc?id=FILE_ID
 *   drive.google.com/thumbnail?id=FILE_ID&sz=...
 *
 * @param {string} value
 * @returns {string | null}
 */
function extractDriveFileId(value) {
	if (!/drive\.google\.com/i.test(value)) return null;
	const pathMatch = value.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
	if (pathMatch) return pathMatch[1];
	const queryMatch = value.match(/[?&]id=([a-zA-Z0-9_-]+)/);
	if (queryMatch) return queryMatch[1];
	return null;
}

/**
 * Resolves a sheet-entered image value into a usable src.
 * Google Drive share links (any shape someone pastes from the "Copy link"
 * button) are rewritten into Drive's direct-image thumbnail endpoint, which
 * also gives free resizing. Other full URLs pass through untouched.
 * Anything else is treated as relative to the site's /assets/ folder —
 * "/assets/" is optional and stripped/re-added so "img/clubs/x.jpg",
 * "/img/clubs/x.jpg", and "/assets/img/clubs/x.jpg" all resolve the same way.
 *
 * @param {string} value
 */
export function resolveImagePath(value) {
	if (!value) return '';
	const driveFileId = extractDriveFileId(value);
	if (driveFileId) return `https://drive.google.com/thumbnail?id=${driveFileId}&sz=w1000`;
	if (/^https?:\/\//i.test(value)) return value;
	const trimmed = value.replace(/^\/?assets\//, '').replace(/^\//, '');
	return `/assets/${trimmed}`;
}

function escapeHtml(str) {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

function linkify(str) {
	return str
		.replace(/([\w.+-]+@[\w-]+\.[\w.-]+)/g, '<a href="mailto:$1">$1</a>')
		.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1">$1</a>');
}

/**
 * Turns free-form text into an array of paragraph HTML strings — one per
 * non-blank line — with plain URLs and email addresses auto-linkified.
 * Input is HTML-escaped first, so this is safe to render with {@html}.
 *
 * @param {string} text
 * @returns {string[]}
 */
export function renderRichText(text) {
	if (!text) return [];
	return text
		.split('\n')
		.map((line) => line.trim())
		.filter(Boolean)
		.map((line) => linkify(escapeHtml(line)));
}
