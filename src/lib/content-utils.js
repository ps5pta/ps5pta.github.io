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
