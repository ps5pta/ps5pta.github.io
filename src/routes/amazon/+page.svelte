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

<p>Redirecting to <a href={target}>Amazon</a>…</p>
