<script>
	import '../app.css';
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Lightbox from '$lib/components/Lightbox.svelte';

	const BARE_ROUTES = ['/amazon', '/clubs-initiatives'];

	let { children } = $props();
	let bare = $derived(BARE_ROUTES.includes(page.url.pathname));
</script>

{#if bare}
	{@render children()}
{:else}
	<Header />

	{@render children()}

	<Footer />

	<Lightbox />
{/if}
