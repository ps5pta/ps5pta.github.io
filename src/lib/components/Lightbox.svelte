<script>
	import { lightbox, closeLightbox } from '$lib/lightbox.svelte.js';

	function handleKeydown(e) {
		if (e.key === 'Escape') closeLightbox();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if lightbox.src}
	<div class="lightbox-overlay" onclick={closeLightbox} role="presentation">
		<button class="lightbox-close" onclick={closeLightbox} aria-label="Close image preview">&times;</button>
		<img src={lightbox.src} alt={lightbox.alt} onclick={(e) => e.stopPropagation()} />
	</div>
{/if}
