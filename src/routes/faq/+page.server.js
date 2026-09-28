import { getCardRows } from '$lib/server/sheets';

export async function load() {
	const faqs = await getCardRows('FAQ');
	return { faqs };
}
