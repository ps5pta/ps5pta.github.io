<script>
	import { openLightbox } from '$lib/lightbox.svelte.js';

	let { src = '', alt = '' } = $props();
</script>

<button type="button" class="zoomable" onclick={() => openLightbox(src, alt)} aria-label="View larger image">
	<img {src} {alt} />
</button>
