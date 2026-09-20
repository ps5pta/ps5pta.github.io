<script>
	import '../app.css';
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Lightbox from '$lib/components/Lightbox.svelte';

	let { children } = $props();
	let bare = $derived(page.url.pathname === '/amazon');
</script>

{#if bare}
	{@render children()}
{:else}
	<Header />

	{@render children()}

	<Footer />

	<Lightbox />
{/if}
