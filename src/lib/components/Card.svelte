<script>
	let { image = '', alt = '', title = '', center = false, children } = $props();
</script>

<div class="card" class:text-center={center}>
	{#if image}<img src={image} {alt} />{/if}
	{#if title}<h3>{title}</h3>{/if}
	{#if children}{@render children()}{/if}
</div>
