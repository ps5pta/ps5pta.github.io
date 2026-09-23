<script>
	import Hero from '$lib/components/Hero.svelte';
	import Card from '$lib/components/Card.svelte';
	import RichText from '$lib/components/RichText.svelte';
	import { groupBySection, resolveImagePath } from '$lib/content-utils.js';

	let { data } = $props();
	let c = $derived(data.content);
	let sections = $derived(groupBySection(data.cards));
</script>

<svelte:head>
	<title>Initiatives — PS5 PTA</title>
	<meta
		name="description"
		content="PTA-run initiatives at Dr. Michael Conti PS5 — art residencies, school assemblies, the Book Fair, and more."
	/>
</svelte:head>

<Hero eyebrow="Get Involved" title={c['intro.heading']} subtitle={c['intro.lead1']} />

<section class="block">
	<div class="container">
		<p class="lead">{c['intro.lead2']}</p>
		<p class="lead">{c['intro.contactNote']}</p>
	</div>
</section>

{#each sections as sec, i}
	<section class="block" class:alt={i % 2 === 0}>
		<div class="container">
			<h2>{sec.section}</h2>
			{#each sec.leads as lead}
				<div class="lead">
					<RichText text={lead.text} />
				</div>
			{/each}
			{#if sec.items.length > 0}
				<div class="grid cols-2">
					{#each sec.items as card}
						<Card image={resolveImagePath(card.image)} alt={card.heading} title={card.heading}>
							<RichText text={card.text} />
						</Card>
					{/each}
				</div>
			{/if}
		</div>
	</section>
{/each}

<section class="block text-center">
	<div class="container">
		<p class="lead" style="margin:0 auto;">
			Want to get involved? See the <a href={c['getInvolved.crossLink']}>Clubs page</a> for ways to join.
		</p>
	</div>
</section>
