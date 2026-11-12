<script>
	import Hero from '$lib/components/Hero.svelte';
	import { resolveImagePath } from '$lib/content-utils.js';

	let { data } = $props();
	let c = $derived(data.content);

	const web = (u) => (/^https?:\/\//i.test(u) ? u : `https://${u}`);
	const ig = (h) => `https://www.instagram.com/${h.replace(/^@/, '')}/`;
	const tel = (p) => `tel:${p.replace(/[^\d+]/g, '')}`;
	const map = (a) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a)}`;
</script>

<svelte:head>
	<title>Local Businesses — PS5 PTA</title>
	<meta
		name="description"
		content="Neighborhood businesses that support the PS5 PTA and school community in Jersey City."
	/>
</svelte:head>

<Hero eyebrow={c['hero.eyebrow']} title={c['hero.title']} subtitle={c['hero.subtitle']} />

<section class="block">
	<div class="container">
		<h2>{c['list.heading']}</h2>
		{#if c['guide.href']}
			<div class="btn-row">
				<a class="btn" href={c['guide.href']}>{c['guide.label'] || 'Download the guide (PDF)'}</a>
			</div>
		{/if}
		<div class="biz-grid">
			{#each data.businesses as b}
				<article class="biz">
					<header>
						{#if b.image}<img src={resolveImagePath(b.image)} alt="" loading="lazy" />{/if}
						<h3>{b.name}</h3>
					</header>
					<p>{b.description}</p>
					<ul>
						{#if b.website}<li><a href={web(b.website)}>{b.website}</a></li>{/if}
						{#if b.instagram}<li><a href={ig(b.instagram)}>{b.instagram}</a></li>{/if}
						{#if b.email}<li><a href="mailto:{b.email}">{b.email}</a></li>{/if}
						{#if b.phone}<li><a href={tel(b.phone)}>{b.phone}</a></li>{/if}
						{#if b.address}<li><a href={map(b.address)}>{b.address}</a></li>{/if}
					</ul>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.biz-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 20px;
		margin-top: 28px;
	}
	.biz {
		display: flex;
		flex-direction: column;
		background: var(--white);
		border-radius: var(--radius);
		box-shadow: var(--shadow);
		border-top: 4px solid var(--gold);
		padding: 20px;
	}
	.biz header { display: flex; align-items: center; gap: 14px; margin-bottom: 12px; }
	.biz img {
		width: 84px;
		height: 57px;
		object-fit: contain;
		flex: none;
		border-radius: 8px;
	}
	.biz h3 { margin: 0; font-size: 1.1rem; color: var(--navy); }
	.biz p { margin: 0 0 14px; color: var(--text-light); font-size: 0.95rem; flex: 1; }
	.biz ul { list-style: none; margin: 0; padding: 12px 0 0; border-top: 1px solid var(--gray-bg); font-size: 0.9rem; }
	.biz li { margin: 3px 0; overflow-wrap: anywhere; }
</style>
