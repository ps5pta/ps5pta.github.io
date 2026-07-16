<script>
	/** @type {{ groups: { title: string, members: { name: string, role: string }[] }[] }} */
	let { groups = [] } = $props();
</script>

<div class="grid cols-3">
	{#each groups as group}
		<div class="people-group">
			<h4>{group.title}</h4>
			<ul>
				{#each group.members as member}
					<li>{member.role ? `${member.role}: ${member.name}` : member.name}</li>
				{/each}
			</ul>
		</div>
	{/each}
</div>
