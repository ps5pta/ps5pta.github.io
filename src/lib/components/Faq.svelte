<script>
	/** @type {{ items: { question: string, answer: string }[] }} */
	let { items = [] } = $props();
</script>

{#each items as item, i}
	<details open={i === 0}>
		<summary>{item.question}</summary>
		<p>{@html item.answer}</p>
	</details>
{/each}
