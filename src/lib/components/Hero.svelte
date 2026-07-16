<script>
	let { eyebrow = '', title = '', subtitle = '', photo = '', children } = $props();
</script>

<section class="hero" class:with-photo={!!photo} style={photo ? `background-image: url('${photo}');` : ''}>
	<div class="hero-inner">
		{#if eyebrow}<span class="eyebrow">{eyebrow}</span>{/if}
		<h1>{title}</h1>
		{#if subtitle}<p>{subtitle}</p>{/if}
		{#if children}{@render children()}{/if}
	</div>
</section>
