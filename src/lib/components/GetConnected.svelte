<script>
	import { siInstagram, siFacebook } from 'simple-icons';
	import { groupBy } from '$lib/content-utils.js';

	let { heading, lead, rows = [] } = $props();

	const icons = {
		instagram: { path: siInstagram.path, color: `#${siInstagram.hex}` },
		facebook: { path: siFacebook.path, color: `#${siFacebook.hex}` }
	};

	let groups = $derived(groupBy(rows, 'group'));
	let first = $derived(groups[0]);
	let middle = $derived(groups.slice(1, -1));
	let last = $derived(groups.length > 1 ? groups[groups.length - 1] : null);
</script>

{#snippet item(it)}
	{#if it.type === 'social'}
		<a class="social-link" href={it.url} aria-label={it.label}>
			<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" fill={icons[it.icon]?.color}>
				<path d={icons[it.icon]?.path} />
			</svg>
			<span>{it.description || it.label}</span>
		</a>
	{:else if it.type === 'note'}
		<p class="note"><strong>{it.label}</strong>{it.description}</p>
	{:else}
		<div class="action">
			{#if it.description}<p>{it.description}</p>{/if}
			<a class="btn" href={it.url}>{it.label}</a>
		</div>
	{/if}
{/snippet}

<div class="container">
	<h2>{heading}</h2>
	<p class="lead">{lead}</p>

	{#if first}
		<div class="cards">
			{#each first.items as it}
				<div class="card">{@render item(it)}</div>
			{/each}
		</div>
	{/if}

	{#if middle.length}
		<div class="panels">
			{#each middle as group}
				<div class="panel">
					<h3>{group.key}</h3>
					<div class="stack">
						{#each group.items as it}{@render item(it)}{/each}
					</div>
				</div>
			{/each}
		</div>
	{/if}

	{#if last}
		<div class="strip">
			<h3>{last.key}</h3>
			<div class="strip-buttons">
				{#each last.items as it}
					<a class="btn small" href={it.url}>{it.label}</a>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 20px;
		margin-top: 28px;
	}
	.card {
		display: flex;
		background: var(--white);
		border-radius: var(--radius);
		box-shadow: var(--shadow);
		border-top: 4px solid var(--gold);
		padding: 22px;
	}
	.action { display: flex; flex-direction: column; flex: 1; }
	.action p { margin: 0 0 16px; color: var(--text-light); flex: 1; }
	.action .btn { text-align: center; margin-top: 0; }

	.panels {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 20px;
		margin-top: 20px;
	}
	.panel {
		background: var(--white);
		border-radius: var(--radius);
		box-shadow: var(--shadow);
		padding: 24px;
	}
	.panel h3 { margin: 0 0 14px; color: var(--navy); }
	.stack { display: flex; flex-direction: column; gap: 10px; }
	.panel .action p { flex: none; }

	.social-link {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 10px 14px;
		border-radius: 12px;
		background: var(--gray-bg);
		color: var(--navy);
		font-weight: 600;
	}
	.social-link:hover { text-decoration: none; background: #eceef6; }
	.note {
		margin: 6px 0 0;
		padding: 12px 14px;
		border-left: 4px solid var(--gold);
		background: #fffaf0;
		border-radius: 0 10px 10px 0;
		font-size: 0.92rem;
		color: var(--text-light);
	}
	.note strong { display: block; color: var(--navy); margin-bottom: 2px; }

	.strip {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 12px 24px;
		margin-top: 20px;
		padding: 16px 24px;
		border-radius: var(--radius);
		background: var(--navy);
	}
	.strip h3 { margin: 0; font-size: 1rem; color: var(--white); }
	.strip-buttons { display: flex; flex-wrap: wrap; gap: 10px; }
	.btn.small { margin-top: 0; padding: 8px 18px; font-size: 0.9rem; }
</style>
