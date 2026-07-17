import { getPageContent, getCardRows } from '$lib/server/sheets';

export async function load() {
	const [content, boardMembers, donors] = await Promise.all([
		getPageContent('Home'),
		getCardRows('BoardMembers'),
		getCardRows('Donors')
	]);
	return { content, boardMembers, donors };
}
