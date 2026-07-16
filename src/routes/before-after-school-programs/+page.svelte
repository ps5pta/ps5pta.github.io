<script>
	import Hero from '$lib/components/Hero.svelte';
	import Card from '$lib/components/Card.svelte';
	import { pluckList } from '$lib/content-utils.js';

	let { data } = $props();
	let c = $derived(data.content);

	let classes = $derived(pluckList(c, 'asp.class'));
</script>

<svelte:head>
	<title>Before & After School Programs — PS5 PTA</title>
	<meta
		name="description"
		content="Morning Stars before-school care, CASPER after-school care, and the PS5 After School Enrichment Program."
	/>
</svelte:head>

<Hero eyebrow={c['hero.eyebrow']} title={c['hero.title']} subtitle={c['hero.subtitle']} />

<section class="block">
	<div class="container">
		<div class="grid cols-2">
			<Card title={c['morningStars.heading']}>
				<p><strong>Hours:</strong> {c['morningStars.hours']}</p>
				<p><strong>Not available on:</strong> {c['morningStars.notAvailable']}</p>
				<p><strong>Snacks:</strong> {c['morningStars.snacks']}</p>
			</Card>
			<Card title={c['casper.heading']}>
				<p><strong>Hours:</strong> {c['casper.hours']}</p>
				<p><strong>Not available on:</strong> {c['casper.notAvailable']}</p>
				<p><strong>Snacks:</strong> {c['casper.snacks']}</p>
			</Card>
		</div>

		<div class="notice" style="margin-top:32px;">
			{c['assistance.body']}
		</div>
		<div class="notice">
			{c['payment.body']}
		</div>
	</div>
</section>

<section class="block alt">
	<div class="container">
		<h2>{c['asp.heading']}</h2>
		<p class="lead">{c['asp.lead']}</p>

		<div class="grid cols-2" style="margin-top:28px; align-items:start;">
			<div>
				<p><strong>Who:</strong> {c['asp.who']}</p>
				<p><strong>When:</strong> {c['asp.when']}</p>
				<p><strong>Cost:</strong> {c['asp.cost']}</p>
			</div>
			<div>
				<h4 style="margin-top:0;">{c['asp.classesHeading']}</h4>
				<ul style="column-count:2; column-gap:24px;">
					{#each classes as cls}
						<li>{cls}</li>
					{/each}
				</ul>
			</div>
		</div>

		<p style="margin-top:20px;">
			Questions about the ASP? Email <a href="mailto:{c['asp.contactEmail']}">{c['asp.contactEmail']}</a>.
		</p>
	</div>
</section>
