<script>
	import { renderRichText } from '$lib/content-utils.js';

	let { text = '' } = $props();
	let paragraphs = $derived(renderRichText(text));
</script>

{#each paragraphs as paragraph}
	<p>{@html paragraph}</p>
{/each}
