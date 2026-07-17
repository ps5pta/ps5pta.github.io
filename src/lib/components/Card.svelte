<script>
	import ZoomableImage from '$lib/components/ZoomableImage.svelte';

	let { image = '', alt = '', title = '', center = false, children } = $props();
</script>

<div class="card" class:text-center={center}>
	{#if image}<ZoomableImage src={image} {alt} />{/if}
	{#if title}<h3>{title}</h3>{/if}
	{#if children}{@render children()}{/if}
</div>
