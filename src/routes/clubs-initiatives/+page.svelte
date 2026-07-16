<script>
	import Hero from '$lib/components/Hero.svelte';
	import Card from '$lib/components/Card.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import { pluckIndexed, pluckList } from '$lib/content-utils.js';

	let { data } = $props();
	let c = data.content;

	let chessFaq = $derived(pluckIndexed(c, 'chess.faq'));
	let cultureProjects = $derived(pluckList(c, 'culture.project'));
</script>

<svelte:head>
	<title>Clubs & Initiatives — PS5 PTA</title>
	<meta
		name="description"
		content="Clubs and enrichment initiatives at Dr. Michael Conti PS5 — chess, culture, garden, music theatre, financial literacy, and more."
	/>
</svelte:head>

<Hero eyebrow="Get Involved" title={c['intro.heading']} subtitle={c['intro.lead1']} />

<section class="block">
	<div class="container">
		<p class="lead">{c['intro.lead2']}</p>
		<p class="lead">{c['intro.contactNote']}</p>

		<h2 style="margin-top:40px;">{c['clubs.heading']}</h2>
		<div class="grid cols-2">
			<Card image="/assets/img/clubs/chess-club.jpg" alt="Chess Club students" title={c['chess.heading']}>
				<Faq items={chessFaq} />
			</Card>

			<Card image="/assets/img/clubs/culture-club-kind3.jpg" alt="Culture Club kindness project" title={c['culture.heading']}>
				<p><strong>Team:</strong> {c['culture.team']}</p>
				<p><strong>Mission:</strong> {c['culture.mission']}</p>
				<p>Focused projects include:</p>
				<ul>
					{#each cultureProjects as project}
						<li>{project}</li>
					{/each}
				</ul>
				<p>To join, email <a href="mailto:{c['culture.contactEmail']}">{c['culture.contactEmail']}</a>.</p>
			</Card>

			<Card image="/assets/img/clubs/indus.jpg" alt="School garden" title={c['garden.heading']}>
				<p><strong>Who can join:</strong> {c['garden.who']}</p>
				<p><strong>When &amp; where:</strong> {c['garden.whenWhere']}</p>
				<p>{c['garden.body']}</p>
			</Card>

			<Card image="/assets/img/clubs/IMG_5491.jpg" alt="Music Theatre students" title={c['musicTheatre.heading']}>
				<p>{c['musicTheatre.body']}</p>
			</Card>

			<Card title={c['financialLiteracy.heading']}>
				<p>{c['financialLiteracy.body']}</p>
			</Card>
		</div>
	</div>
</section>

<section class="block alt">
	<div class="container">
		<h2>{c['initiatives.heading']}</h2>
		<p class="lead">{c['initiatives.lead']}</p>

		<div class="grid cols-2" style="margin-top:32px;">
			<Card title={c['artResidencies.heading']}>
				<img src="/assets/img/clubs/screenshot-2025-05-13.png" alt="Theatre residency in classroom" style="margin-bottom:12px;" />
				<p>{c['artResidencies.theatreBody']}</p>
				<img src="/assets/img/clubs/screenshot-2023-04-01.png" alt="Dance residency" style="margin:12px 0;" />
				<p>{c['artResidencies.danceBody']}</p>
			</Card>

			<Card title={c['schoolAssemblies.heading']}>
				<p>{c['schoolAssemblies.body']}</p>
			</Card>

			<Card title={c['bookFair.heading']}>
				<p>{c['bookFair.body']}</p>
			</Card>

			<Card title={c['freeLibrary.heading']}>
				<p>{c['freeLibrary.body']}</p>
			</Card>

			<Card title={c['invitedSpeakers.heading']}>
				<p>{c['invitedSpeakers.body']}</p>
			</Card>

			<Card title={c['parentWorkshops.heading']}>
				<p>{c['parentWorkshops.body']}</p>
			</Card>

			<Card title={c['advocacy.heading']}>
				<p>{c['advocacy.body']}</p>
			</Card>

			<Card title={c['specialEd.heading']}>
				<p>{c['specialEd.body']}</p>
			</Card>
		</div>
	</div>
</section>

<section class="block">
	<div class="container text-center">
		<h2>{c['getInvolved.heading']}</h2>
		<p class="lead" style="margin:0 auto;">{c['getInvolved.body']}</p>
	</div>
</section>
