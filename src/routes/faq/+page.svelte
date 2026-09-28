<script>
	import Hero from '$lib/components/Hero.svelte';
	import RichText from '$lib/components/RichText.svelte';
	import { groupBy } from '$lib/content-utils.js';

	let { data } = $props();
	let categories = $derived(groupBy(data.faqs, 'category'));
</script>

<svelte:head>
	<title>FAQ — PS5 PTA</title>
	<meta
		name="description"
		content="Frequently asked questions about PS5 — attendance, before & after care, uniforms, food, safety, clubs, special education, and more."
	/>
</svelte:head>

<Hero
	eyebrow="Need to Know"
	title="Frequently Asked Questions"
	subtitle="Answers to common questions from PS5 families — organized by topic."
/>

{#each categories as cat, i}
	<section class="block" class:alt={i % 2 === 0}>
		<div class="container">
			<h2>{cat.key}</h2>
			<div class="card faq" style="margin-top:20px;">
				{#each cat.items as item}
					<details>
						<summary>{item.question}</summary>
						<RichText text={item.answer} />
					</details>
				{/each}
			</div>
		</div>
	</section>
{/each}

<section class="block alt text-center">
	<div class="container">
		<h2>Still Have Questions?</h2>
		<p class="lead" style="margin:0 auto;">
			Reach out to the PTA at <a href="mailto:jerseycityps5pta@gmail.com">jerseycityps5pta@gmail.com</a>.
		</p>
	</div>
</section>
