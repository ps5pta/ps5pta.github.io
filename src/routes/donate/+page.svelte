<script>
	import { onMount } from 'svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Card from '$lib/components/Card.svelte';

	let { data } = $props();
	let c = $derived(data.content);

	onMount(() => {
		// The widget script scans the DOM for .fundraising-embeddable-widget on load,
		// so it must be injected after that element exists — loading it in <svelte:head>
		// runs it before <body> is parsed and it silently finds nothing to initialize.
		const script = document.createElement('script');
		script.src = 'https://app.givebacks.gives/Scripts/widgets/campaign-fundraising-widget.js';
		document.body.appendChild(script);
		return () => script.remove();
	});
</script>

<svelte:head>
	<title>Donate — PS5 PTA</title>
	<meta name="description" content="Support the PS5 PTA through PayPal, Givebacks membership, or cash donations." />
	<link href="https://app.givebacks.gives/Content/widgets/campaign-fundraising-widget.css" rel="stylesheet" />
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

<section class="block">
	<div class="container text-center">
		<h2>{c['colorfest.heading']}</h2>
		<p class="lead" style="margin:0 auto 20px;">{c['colorfest.body']}</p>
		<div style="max-width:320px; margin:0 auto;">
			<div
				class="fundraising-embeddable-widget"
				data-url="https://app.givebacks.gives/campaigns/getcampaignstatus/25118d"
				data-permanenturl="25118d"
				style="display: none; background-color: rgb(255, 255, 255); border-color: rgb(33, 150, 243);"
				data-initialized="false"
			>
				<div class="fundraising-embeddable-widget-img-container">
					<img
						src="https://d2jjj41xkpuaip.cloudfront.net/246x164/RallyUpProduction/4f80dcd40d7f67b39c787dc94a4c4b38.png"
						alt=""
					/>
				</div>
				<div class="fundraising-embeddable-widget-headline" style="color: rgb(243, 33, 33);"></div>
				<div class="fundraising-embeddable-widget-body" style="color: rgb(142, 142, 142);"></div>
				<div class="fundraising-embeddable-widget-more-info">
					<a href="https://app.givebacks.gives/colorfest2026" style="color: rgb(243, 33, 33);">More Info</a>
				</div>
				<div class="fundraising-embeddable-widget-progress-container">
					<div class="fundraising-embeddable-widget-progress-bar" style="display: none;">
						<div
							class="fundraising-embeddable-widget-progress-bar-bar"
							style="background-color: rgb(139, 195, 74); width: 1%;"
						></div>
					</div>
					<div class="fundraising-embeddable-widget-raized" style="display: none;">
						1% raised of $25,000 Goal
					</div>
				</div>
				<div class="fundraising-embeddable-widget-contribute-button-container">
					<a
						href="https://app.givebacks.gives/25118d?OpenDonateModal=true"
						class="fundraising-embeddable-widget-contribute-button"
						style="text-decoration: none; background-color: rgb(139, 195, 74); border-color: rgb(125, 176, 67);"
						>Donate</a
					>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="block alt">
	<div class="container text-center">
		<h2>{c['where.heading']}</h2>
		<p class="lead" style="margin:0 auto;">{c['where.body']}</p>
		<div class="btn-row" style="justify-content:center; margin-top:20px;">
			<a class="btn" href="/clubs">{c['where.cta1Label']}</a>
			<a class="btn" style="background:var(--navy); color:var(--white);" href="/fundraising-events">{c['where.cta2Label']}</a>
		</div>
	</div>
</section>
