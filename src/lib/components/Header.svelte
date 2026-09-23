<script>
	import { page } from '$app/state';

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/clubs', label: 'Clubs' },
		{ href: '/initiatives', label: 'Initiatives' },
		{ href: '/fundraising-events', label: 'Fundraising & Events' },
		{ href: '/before-after-school-programs', label: 'Before & After' },
		{ href: '/general-school-info', label: 'School Info' }
	];

	function isActive(href) {
		return page.url.pathname === href;
	}
</script>

<header class="site-header">
	<nav class="nav-wrap">
		<a class="brand" href="/">PS5 <span>PTA</span></a>
		<ul class="nav-links">
			{#each links as link}
				<li><a href={link.href} class:active={isActive(link.href)}>{link.label}</a></li>
			{/each}
			<li><a href="/donate" class="donate-link" class:active={isActive('/donate')}>Donate</a></li>
		</ul>
	</nav>
</header>
