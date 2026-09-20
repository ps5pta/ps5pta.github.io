<script>
	import { onMount } from 'svelte';

	const target = 'https://www.amazon.com/?tag=ps5pta-20';

	onMount(() => {
		window.location.replace(target);
	});
</script>

<svelte:head>
	<title>Redirecting to Amazon — PS5 PTA</title>
	<meta http-equiv="refresh" content={`0;url=${target}`} />
</svelte:head>

<main>
	<div class="spinner" aria-hidden="true"></div>
	<p class="eyebrow">PS5 PTA</p>
	<h1>Taking you to Amazon…</h1>
	<p class="note">
		Thanks for supporting the PTA! If you're not redirected automatically,
		<a href={target}>click here</a>.
	</p>
</main>

<style>
	:global(html),
	:global(body) {
		background: #ffffff;
	}

	main {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 24px;
		font-family: "Segoe UI", system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif;
	}

	.spinner {
		width: 36px;
		height: 36px;
		border: 3px solid #f0e4c8;
		border-top-color: #f0b429;
		border-radius: 50%;
		margin-bottom: 24px;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.eyebrow {
		margin: 0 0 8px;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #f0b429;
	}

	h1 {
		margin: 0 0 12px;
		font-family: Georgia, "Times New Roman", serif;
		font-size: 1.5rem;
		color: #16264a;
	}

	.note {
		margin: 0;
		color: #5a6478;
		font-size: 0.95rem;
	}

	.note a {
		color: #16264a;
		font-weight: 600;
		text-decoration: underline;
	}
</style>
