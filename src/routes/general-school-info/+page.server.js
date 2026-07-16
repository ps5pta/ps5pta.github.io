import { getPageContent } from '$lib/server/sheets';

export async function load() {
	const content = await getPageContent('GeneralInfo');
	return { content };
}
