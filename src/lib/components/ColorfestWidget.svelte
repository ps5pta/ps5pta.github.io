<script>
	import { onMount } from 'svelte';

	let { heading = '', body = '' } = $props();

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
	<link href="https://app.givebacks.gives/Content/widgets/campaign-fundraising-widget.css" rel="stylesheet" />
</svelte:head>

<div class="container text-center">
	{#if heading}<h2>{heading}</h2>{/if}
	{#if body}<p class="lead" style="margin:0 auto 20px;">{body}</p>{/if}
	<div style="max-width:320px; margin:0 auto;">
		<div
			class="fundraising-embeddable-widget"
			data-url="https://app.givebacks.gives/campaigns/getcampaignstatus/25118d"
			data-permanenturl="25118d"
			style="display: none; background-color: rgb(255, 255, 255); border-color: rgb(33, 150, 243);"
			data-initialized="false"
		>
			<div class="fundraising-embeddable-widget-img-container">
				<img src="/assets/img/fundraising/colorfest-2026.png" alt="Colorfest 2026 — PS5 PTA fundraiser" />
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
