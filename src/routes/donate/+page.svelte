<script>
	import Hero from '$lib/components/Hero.svelte';
	import Card from '$lib/components/Card.svelte';

	let { data } = $props();
	let c = data.content;
</script>

<svelte:head>
	<title>Donate — PS5 PTA</title>
	<meta name="description" content="Support the PS5 PTA through PayPal, Givebacks membership, or cash donations." />
</svelte:head>

<Hero eyebrow={c['hero.eyebrow']} title={c['hero.title']} subtitle={c['hero.subtitle']} />

<section class="block">
	<div class="container">
		<div class="grid cols-3">
			<Card center title={c['paypal.title']}>
				<div style="font-size:2.5rem; margin-bottom:12px;">💳</div>
				<p>{c['paypal.body']}</p>
				<a class="btn" href={c['paypal.href']}>{c['paypal.buttonLabel']}</a>
			</Card>
			<Card center title={c['givebacks.title']}>
				<div style="font-size:2.5rem; margin-bottom:12px;">🤝</div>
				<p>{c['givebacks.body']}</p>
				<a class="btn" href={c['givebacks.href']}>{c['givebacks.buttonLabel']}</a>
			</Card>
			<Card center title={c['cash.title']}>
				<div style="font-size:2.5rem; margin-bottom:12px;">💵</div>
				<p>{c['cash.body']}</p>
				<p style="color:var(--text-light); font-size:0.9rem;">{c['cash.note']}</p>
			</Card>
		</div>

		<div class="notice" style="margin-top:40px; text-align:center;">
			{c['notice.body']}
		</div>
	</div>
</section>

<section class="block alt">
	<div class="container text-center">
		<h2>{c['where.heading']}</h2>
		<p class="lead" style="margin:0 auto;">{c['where.body']}</p>
		<div class="btn-row" style="justify-content:center; margin-top:20px;">
			<a class="btn" href="/clubs-initiatives">{c['where.cta1Label']}</a>
			<a class="btn" style="background:var(--navy); color:var(--white);" href="/fundraising-events">{c['where.cta2Label']}</a>
		</div>
	</div>
</section>
