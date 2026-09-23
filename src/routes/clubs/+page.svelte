<script>
	import Hero from '$lib/components/Hero.svelte';
	import Card from '$lib/components/Card.svelte';
	import RichText from '$lib/components/RichText.svelte';
	import DonorStrip from '$lib/components/DonorStrip.svelte';
	import { groupBySection, resolveImagePath, pluckList } from '$lib/content-utils.js';

	let { data } = $props();
	let c = $derived(data.content);
	let sections = $derived(groupBySection(data.cards));
	let getInvolvedItems = $derived(pluckList(c, 'getInvolved.item'));
	let chessBullets = $derived(pluckList(c, 'chess.bullet'));
	let gardenProgram = $derived(pluckList(c, 'garden.program'));
	let gardenSponsors = $derived(
		data.gardenSponsors.map((s) => ({
			src: resolveImagePath(s.image),
			alt: s.label,
			href: s.href || undefined,
			label: s.label
		}))
	);
</script>

<svelte:head>
	<title>Clubs — PS5 PTA</title>
	<meta
		name="description"
		content="Student clubs at Dr. Michael Conti PS5 — chess, culture, garden, music theatre, and more."
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

<section class="block alt" id="chess-club">
	<div class="container">
		{#if c['chess.logo']}
			<img
				src={resolveImagePath(c['chess.logo'])}
				alt="Chess Club logo"
				style="max-width:140px; display:block; margin:0 auto 24px;"
			/>
		{/if}
		<h2 class="text-center">{c['chess.tagline']}</h2>
		<p class="lead text-center" style="margin:0 auto;">{c['chess.subtitle']}</p>
		{#if chessBullets.length > 0}
			<ul class="grid cols-2" style="margin-top:24px;">
				{#each chessBullets as item}
					<li>{item}</li>
				{/each}
			</ul>
		{/if}
		<p class="lead text-center" style="margin:24px auto 0;">{c['chess.closing']}</p>
	</div>
</section>

<section class="block" id="garden-club">
	<div class="container">
		{#if c['garden.logo']}
			<img
				src={resolveImagePath(c['garden.logo'])}
				alt="Garden Club logo"
				style="max-width:180px; display:block; margin:0 auto 24px;"
			/>
		{/if}
		<h2 class="text-center">{c['garden.tagline']}</h2>
		<p class="lead text-center" style="margin:0 auto;">{c['garden.subtitle']}</p>
		{#if gardenProgram.length > 0}
			<ul class="grid cols-2" style="margin-top:24px;">
				{#each gardenProgram as item}
					<li>{item}</li>
				{/each}
			</ul>
		{/if}
		<p class="lead text-center" style="margin:24px auto 0;">{c['garden.closing']}</p>
		{#if gardenSponsors.length > 0}
			<DonorStrip donors={gardenSponsors} maxHeight={56} showLabels={false} />
		{/if}
	</div>
</section>

<section class="block alt text-center" id="get-involved">
	<div class="container">
		<h2>{c['getInvolved.heading']}</h2>
		<p class="lead" style="margin:0 auto;">{c['getInvolved.body']}</p>
		{#if getInvolvedItems.length > 0}
			<ul style="text-align:left; max-width:640px; margin:24px auto 0;">
				{#each getInvolvedItems as item}
					<li style="margin-bottom:12px;"><RichText text={item} /></li>
				{/each}
			</ul>
		{/if}
	</div>
</section>
