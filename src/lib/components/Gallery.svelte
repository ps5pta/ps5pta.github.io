<script>
	/** @type {{ images: { src: string, alt: string }[] }} */
	let { images = [] } = $props();
</script>

<div class="gallery">
	{#each images as img}
		<img src={img.src} alt={img.alt} />
	{/each}
</div>
