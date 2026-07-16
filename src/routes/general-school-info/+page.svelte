<script>
	import Hero from '$lib/components/Hero.svelte';
	import Card from '$lib/components/Card.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import { pluckList, pluckIndexed } from '$lib/content-utils.js';

	let { data } = $props();
	let c = data.content;

	let kTo5Bullets = $derived(pluckList(c, 'uniform.kto5.bullet'));
	let middleBullets = $derived(pluckList(c, 'uniform.middle.bullet'));
	let scheduleTimes = $derived(pluckIndexed(c, 'schedule.times'));
	let attendanceBullets = $derived(pluckList(c, 'attendance.bullet'));
	let faqItems = $derived(pluckIndexed(c, 'faq'));
	let schoolLinks = $derived(pluckIndexed(c, 'links.school'));
	let portalLinks = $derived(pluckIndexed(c, 'links.portals'));
	let docLinks = $derived(pluckIndexed(c, 'links.docs'));
</script>

<svelte:head>
	<title>General School Info — PS5 PTA</title>
	<meta
		name="description"
		content="Uniform policy, daily schedule, FAQs, and important links for Dr. Michael Conti PS5, Jersey City."
	/>
</svelte:head>

<Hero eyebrow={c['hero.eyebrow']} title={c['hero.title']} subtitle={c['hero.subtitle']} />

<section class="block">
	<div class="container">
		<h2>{c['uniform.heading']}</h2>
		<div class="grid cols-3">
			<Card title={c['uniform.prek.heading']}>
				<p>{c['uniform.prek.body']}</p>
			</Card>
			<Card title={c['uniform.kto5.heading']}>
				<ul>
					{#each kTo5Bullets as bullet}
						<li>{bullet}</li>
					{/each}
				</ul>
				<p>{c['uniform.kto5.note']}</p>
			</Card>
			<Card title={c['uniform.middle.heading']}>
				<ul>
					{#each middleBullets as bullet}
						<li>{bullet}</li>
					{/each}
				</ul>
			</Card>
		</div>
		<div class="notice" style="margin-top:24px;">
			<strong>Where to buy uniforms:</strong> {c['uniform.purchase.body']}
		</div>
	</div>
</section>

<section class="block alt">
	<div class="container">
		<h2>{c['schedule.heading']}</h2>
		<div class="card">
			<ul>
				{#each scheduleTimes as t}
					<li><strong>{t.label}:</strong> {t.value}</li>
				{/each}
			</ul>
		</div>
		<h3 style="margin-top:28px;">{c['attendance.heading']}</h3>
		<div class="card">
			<ul>
				{#each attendanceBullets as bullet}
					<li>{bullet}</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<section class="block">
	<div class="container">
		<h2>{c['faq.heading']}</h2>
		<div class="card">
			<Faq items={faqItems} />
		</div>
	</div>
</section>

<section class="block alt">
	<div class="container">
		<h2>{c['links.heading']}</h2>
		<div class="grid cols-2">
			<Card title={c['links.school.heading']}>
				<ul>
					{#each schoolLinks as link}
						<li><a href={link.href}>{link.label}</a></li>
					{/each}
				</ul>
			</Card>
			<Card title={c['links.portals.heading']}>
				<ul>
					{#each portalLinks as link}
						<li><a href={link.href}>{link.label}</a></li>
					{/each}
				</ul>
			</Card>
			<Card title={c['links.docs.heading']}>
				<ul>
					{#each docLinks as link}
						<li><a href={link.href}>{link.label}</a></li>
					{/each}
				</ul>
			</Card>
		</div>
	</div>
</section>
