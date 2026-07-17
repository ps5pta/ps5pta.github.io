<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Lightbox from '$lib/components/Lightbox.svelte';

	let { children } = $props();
</script>

<Header />

{@render children()}

<Footer />

<Lightbox />
