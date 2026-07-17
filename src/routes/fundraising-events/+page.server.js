import { getPageContent, getCardRows } from '$lib/server/sheets';

export async function load() {
	const [content, partners] = await Promise.all([
		getPageContent('Fundraising'),
		getCardRows('FundraisingPartners')
	]);
	return { content, partners };
}
