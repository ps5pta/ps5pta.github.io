<script>
	import Hero from '$lib/components/Hero.svelte';
	import BoardList from '$lib/components/BoardList.svelte';
	import DonorStrip from '$lib/components/DonorStrip.svelte';
	import { groupBy, pluckList, resolveImagePath } from '$lib/content-utils.js';

	let { data } = $props();
	let c = $derived(data.content);

	let bullets = $derived(pluckList(c, 'whatWeDo.bullet'));

	let boardGroups = $derived(
		groupBy(data.boardMembers, 'group').map(({ key, items }) => ({ title: key, members: items }))
	);

	let donors = $derived(
		data.donors.map((d) => ({
			src: resolveImagePath(d.image),
			alt: d.label,
			href: d.href || undefined,
			label: d.href ? d.label : undefined
		}))
	);
</script>

<svelte:head>
	<title>Jersey City PS5 PTA</title>
	<meta
		name="description"
		content="Official site of the Dr. Michael Conti PS5 PTA in Jersey City — clubs, fundraising, programs, and ways to get involved."
	/>
</svelte:head>

<Hero
	eyebrow={c['hero.eyebrow']}
	title={c['hero.title']}
	subtitle={c['hero.subtitle']}
	photo={resolveImagePath(c['hero.image'])}
>
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
		<BoardList groups={boardGroups} />
	</div>
</section>

<section class="block alt">
	<div class="container">
		<h2>{c['donors.heading']}</h2>
		<p class="lead">{c['donors.lead']}</p>
		<DonorStrip {donors} />
	</div>
</section>
