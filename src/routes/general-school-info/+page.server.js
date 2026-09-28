import { getPageContent, getCardRows } from '$lib/server/sheets';

export async function load() {
	const [content, faqs] = await Promise.all([getPageContent('GeneralInfo'), getCardRows('FAQ')]);
	return { content, faqs };
}
