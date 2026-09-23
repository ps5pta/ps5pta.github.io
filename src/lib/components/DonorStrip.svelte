<script>
	/** @type {{ donors: { src?: string, alt?: string, href?: string, label?: string }[], maxHeight?: number, showLabels?: boolean }} */
	let { donors = [], maxHeight = 40, showLabels = true } = $props();
</script>

<div class="donor-strip">
	{#each donors as donor}
		{#if donor.href}
			<a href={donor.href} style="display:flex; align-items:center; gap:10px;">
				{#if donor.src}<img src={donor.src} alt={donor.alt} style="max-height:{maxHeight}px; width:auto;" />{/if}
				{#if showLabels}{donor.label}{/if}
			</a>
		{:else if donor.src}
			<img src={donor.src} alt={donor.alt} />
		{/if}
	{/each}
</div>
