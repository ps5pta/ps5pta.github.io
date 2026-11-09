import { getPageContent, getCardRows } from '$lib/server/sheets';

export async function load() {
	const [content, boardMembers, donors, connectLinks] = await Promise.all([
		getPageContent('Home'),
		getCardRows('BoardMembers'),
		getCardRows('Donors'),
		getCardRows('GetConnected')
	]);
	return { content, boardMembers, donors, connectLinks };
}
