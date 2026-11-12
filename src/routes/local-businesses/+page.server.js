import { getPageContent, getCardRows } from '$lib/server/sheets';

export async function load() {
	const [content, businesses] = await Promise.all([
		getPageContent('LocalBusinesses'),
		getCardRows('LocalBusinessCards')
	]);
	return { content, businesses };
}
