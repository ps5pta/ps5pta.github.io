<script>
	import ZoomableImage from '$lib/components/ZoomableImage.svelte';

	/** @type {{ images: { src: string, alt: string }[] }} */
	let { images = [] } = $props();
</script>

<div class="gallery">
	{#each images as img}
		<ZoomableImage src={img.src} alt={img.alt} />
	{/each}
</div>
