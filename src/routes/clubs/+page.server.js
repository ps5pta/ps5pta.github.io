import { getPageContent, getCardRows } from '$lib/server/sheets';

export async function load() {
	const [content, cards, gardenSponsors] = await Promise.all([
		getPageContent('Clubs'),
		getCardRows('ClubsCards'),
		getCardRows('GardenSponsors')
	]);
	return { content, cards, gardenSponsors };
}
