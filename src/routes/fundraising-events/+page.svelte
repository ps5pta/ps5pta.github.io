<script>
	import Hero from '$lib/components/Hero.svelte';
	import Card from '$lib/components/Card.svelte';
	import Gallery from '$lib/components/Gallery.svelte';
	import { pluckIndexed } from '$lib/content-utils.js';

	let { data } = $props();
	let c = data.content;

	let events = $derived(pluckIndexed(c, 'events'));

	const galleryImages = [
		'DSC08318.jpg',
		'DSC07948.jpg',
		'DSC07227.jpg',
		'DSC06949.jpg',
		'DSC06311.jpg',
		'IMG_7639.jpg',
		'IMG_2737.jpg',
		'IMG_2768.jpg',
		'dance.png',
		'PHOTO-2025-05-13-12-06-15.jpg',
		'PHOTO-2025-05-13-12-01-45.jpg'
	].map((f) => ({ src: `/assets/img/fundraising/${f}`, alt: 'PS5 PTA event' }));
</script>

<svelte:head>
	<title>Fundraising & Events — PS5 PTA</title>
	<meta name="description" content="PS5 PTA fundraising events and ways to support the school community." />
</svelte:head>

<Hero eyebrow={c['hero.eyebrow']} title={c['hero.title']} subtitle={c['hero.subtitle']} />

<section class="block">
	<div class="container">
		<h2>{c['events.heading']}</h2>
		<p class="lead">{c['events.lead']}</p>
		<div class="grid cols-3" style="margin-top:28px;">
			{#each events as event}
				<div class="card">
					{event.label}
					{#if event.note}<br /><span style="color:var(--text-light); font-size:0.9rem;">{event.note}</span>{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="block alt">
	<div class="container">
		<h2>{c['gallery.heading']}</h2>
		<Gallery images={galleryImages} />
	</div>
</section>

<section class="block">
	<div class="container">
		<h2>{c['shop.heading']}</h2>
		<p class="lead">{c['shop.lead']}</p>
		<div class="grid cols-2" style="margin-top:28px;">
			<Card title={c['shop.amazon.title']}>
				<p>{c['shop.amazon.body']}</p>
				<a class="btn" href={c['shop.amazon.href']}>Shop Amazon &rarr;</a>
			</Card>
			<Card title={c['shop.mabels.title']}>
				<p>{c['shop.mabels.body']}</p>
				<a class="btn" href={c['shop.mabels.href']}>Shop Mabel's Labels &rarr;</a>
			</Card>
			<Card title={c['shop.shoprite.title']}>
				<p>{c['shop.shoprite.body']}</p>
				<a class="btn" href={c['shop.shoprite.href']}>Register at ShopRite &rarr;</a>
			</Card>
			<Card title={c['shop.pediped.title']}>
				<p>{c['shop.pediped.body']}</p>
				<a class="btn" href={c['shop.pediped.href']}>Shop Pediped &rarr;</a>
			</Card>
		</div>
	</div>
</section>

<section class="block alt">
	<div class="container text-center">
		<h2>{c['cta.heading']}</h2>
		<p class="lead" style="margin:0 auto 20px;">{c['cta.body']}</p>
		<a class="btn" href="mailto:{c['cta.email']}">Get in Touch</a>
	</div>
</section>
