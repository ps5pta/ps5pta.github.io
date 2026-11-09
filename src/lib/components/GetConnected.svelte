<script>
	import { siInstagram, siFacebook } from 'simple-icons';
	import { groupBy } from '$lib/content-utils.js';

	let { heading, lead, rows = [] } = $props();

	const icons = {
		instagram: { path: siInstagram.path, color: `#${siInstagram.hex}` },
		facebook: { path: siFacebook.path, color: `#${siFacebook.hex}` }
	};

	let groups = $derived(groupBy(rows, 'group'));
</script>

<div class="container">
	<h2>{heading}</h2>
	<p class="lead">{lead}</p>

	{#each groups as group, i}
		<div class="connect-group" class:secondary={i === groups.length - 1}>
			<h3>{group.key}</h3>
			<div class="connect-items">
				{#each group.items as item}
					{#if item.type === 'social'}
						<a class="social-card" href={item.url} aria-label={item.label}>
							<svg viewBox="0 0 24 24" width="36" height="36" aria-hidden="true" fill={icons[item.icon]?.color}>
								<path d={icons[item.icon]?.path} />
							</svg>
							<span>{item.description || item.label}</span>
						</a>
					{:else if item.type === 'note'}
						<p class="connect-note"><strong>{item.label}:</strong> {item.description}</p>
					{:else}
						<div class="connect-button">
							<a class="btn" href={item.url}>{item.label}</a>
							{#if item.description}<p>{item.description}</p>{/if}
						</div>
					{/if}
				{/each}
			</div>
		</div>
	{/each}
</div>

<style>
	.connect-group { margin-top: 32px; }
	.connect-group h3 { margin: 0 0 8px; color: var(--navy); }
	.connect-group.secondary h3 { font-size: 1rem; color: var(--text-light); }
	.connect-items { display: flex; flex-wrap: wrap; gap: 20px; align-items: flex-start; }
	.connect-button { max-width: 320px; }
	.connect-button p { margin: 6px 4px 0; font-size: 0.9rem; color: var(--text-light); }
	.social-card {
		display: flex; align-items: center; gap: 10px;
		padding: 10px 16px; border-radius: 999px; background: var(--white);
		box-shadow: var(--shadow); color: var(--navy); font-weight: 600;
	}
	.social-card:hover { text-decoration: none; transform: translateY(-1px); }
	.connect-note { flex-basis: 100%; margin: 0; max-width: 640px; color: var(--text-light); }
	.secondary .btn { background: var(--navy); color: var(--white); }
</style>
