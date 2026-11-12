import { getPageContent, getCardRows } from '$lib/server/sheets';

export async function load() {
	const [content, boardMembers, connectLinks] = await Promise.all([
		getPageContent('Home'),
		getCardRows('BoardMembers'),
		getCardRows('GetConnected')
	]);
	return { content, boardMembers, connectLinks };
}
