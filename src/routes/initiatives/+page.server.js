import { getPageContent, getCardRows } from '$lib/server/sheets';

export async function load() {
	const [content, cards] = await Promise.all([
		getPageContent('Initiatives'),
		getCardRows('InitiativesCards')
	]);
	return { content, cards };
}
