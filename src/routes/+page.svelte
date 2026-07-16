<script>
	import Hero from '$lib/components/Hero.svelte';
	import BoardList from '$lib/components/BoardList.svelte';
	import DonorStrip from '$lib/components/DonorStrip.svelte';
	import { pluckIndexed } from '$lib/content-utils.js';

	let { data } = $props();
	let c = $derived(data.content);

	let bullets = $derived(
		Object.keys(c)
			.filter((k) => k.startsWith('whatWeDo.bullet['))
			.sort()
			.map((k) => c[k])
	);

	let officers = $derived(pluckIndexed(c, 'board.officers'));
	let coordinators = $derived(pluckIndexed(c, 'board.coordinators'));
	let chairs = $derived(pluckIndexed(c, 'board.chairs'));
	let donors = $derived(pluckIndexed(c, 'donors'));

	const donorImages = [
		'/assets/img/home/donor-healys-tavern-logo.jpg',
		'/assets/img/home/donor-impress-ballroom-logo.jpg',
		'/assets/img/home/donor-modern-family-dentistry-logo.jpg',
		'/assets/img/home/donor-handyman-nick-instagram-icon.png'
	];
</script>

<svelte:head>
	<title>Jersey City PS5 PTA</title>
	<meta
		name="description"
		content="Official site of the Dr. Michael Conti PS5 PTA in Jersey City — clubs, fundraising, programs, and ways to get involved."
	/>
</svelte:head>

<Hero eyebrow={c['hero.eyebrow']} title={c['hero.title']} subtitle={c['hero.subtitle']} photo="/assets/img/home/hero-unsplash.jpg">
	<div class="btn-row" style="justify-content:center;">
		<a class="btn" href="/donate">Support the PTA</a>
		<a class="btn outline" href="/clubs-initiatives">Explore Clubs &amp; Initiatives</a>
	</div>
</Hero>

<section class="block">
	<div class="container">
		<h2>{c['whatWeDo.heading']}</h2>
		<p class="lead">{c['whatWeDo.lead']}</p>
		<div class="grid cols-2" style="align-items:center; margin-top:32px;">
			<div>
				<ul>
					{#each bullets as bullet}
						<li>{bullet}</li>
					{/each}
				</ul>
				<p>Questions or ideas? Reach us at <a href="mailto:{c['whatWeDo.contactEmail']}">{c['whatWeDo.contactEmail']}</a>.</p>
			</div>
			<img src="/assets/img/home/what-we-do-IMG_5491.jpg" alt="PS5 students at a school event" />
		</div>
		<div class="grid cols-2" style="margin-top:22px;">
			<img src="/assets/img/home/DSC07026.jpg" alt="PS5 school community event" />
			<img src="/assets/img/home/DSC07328.jpg" alt="PS5 school community event" />
		</div>
	</div>
</section>

<section class="block alt">
	<div class="container">
		<h2>{c['whatsOn.heading']}</h2>
		<p class="lead">{c['whatsOn.lead']}</p>
		<div class="btn-row">
			<a class="btn" href="/assets/docs/JCPS_2026-2027_Calendar.pdf">Download Calendar (PDF)</a>
			<a
				class="btn outline"
				style="background:var(--navy); color:var(--white); border-color:var(--navy);"
				href="/assets/docs/JCPS_2026-2027_List.pdf">Download Date List (PDF)</a
			>
		</div>
	</div>
</section>

<section class="block">
	<div class="container">
		<h2>{c['board.heading']}</h2>
		<BoardList
			groups={[
				{ title: 'Executive Officers', members: officers },
				{ title: 'Coordinators & Staff', members: coordinators },
				{ title: 'Committee Chairs', members: chairs }
			]}
		/>
	</div>
</section>

<section class="block alt">
	<div class="container">
		<h2>{c['donors.heading']}</h2>
		<p class="lead">{c['donors.lead']}</p>
		<DonorStrip
			donors={donors.map((d, i) => ({
				src: donorImages[i],
				alt: d.label,
				href: d.href,
				label: d.href ? d.label : undefined
			}))}
		/>
	</div>
</section>
