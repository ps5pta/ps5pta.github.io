<script>
	/** @type {{ donors: { src?: string, alt?: string, href?: string, label?: string }[] }} */
	let { donors = [] } = $props();
</script>

<div class="donor-strip">
	{#each donors as donor}
		{#if donor.href}
			<a href={donor.href} style="display:flex; align-items:center; gap:10px;">
				{#if donor.src}<img src={donor.src} alt={donor.alt} style="max-height:40px; width:auto;" />{/if}
				{donor.label}
			</a>
		{:else if donor.src}
			<img src={donor.src} alt={donor.alt} />
		{/if}
	{/each}
</div>
