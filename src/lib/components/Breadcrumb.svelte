<script lang="ts">
	import { page } from '$app/stores';
	import House from '../icons/House.svelte';
	let path = $state($page.url.pathname.split('/').filter((p) => p));
	$effect(() => {
		path = $page.url.pathname.split('/').filter((p) => p);
	});
</script>

<nav class="flex items-center gap-1 px-4">
	<a
		class="hover:bg-surface-color/40 flex items-center rounded-md fill-contrast-text p-1 transition-colors duration-150 hover:fill-main"
		href="/"
	>
		<House />
	</a>
	{#each path as p, i}
		<svg class="h-4 w-4 shrink-0 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
		</svg>
		{#if i === path.length - 1}
			<span class="text-sm font-medium text-contrast-text">{p}</span>
		{:else}
			<a
				href="/{path.slice(0, i + 1).join('/')}{$page.url.search}"
				class="hover:bg-surface-color/40 rounded-md px-1.5 py-0.5 text-sm text-muted-foreground transition-colors duration-150 hover:text-contrast-text"
			>
				{p}
			</a>
		{/if}
	{/each}
</nav>
