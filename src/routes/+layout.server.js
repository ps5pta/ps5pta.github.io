import { getCardRows } from '$lib/server/sheets';

export async function load() {
	const quickLinks = await getCardRows('QuickLinks');
	return { quickLinks };
}
