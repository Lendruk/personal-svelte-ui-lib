<script lang="ts">
	import type { Component } from 'svelte';

	export type MenuEntry = {
		id: string;
		label: string;
		icon?: Component;
	};

	let {
		entries,
		orientation = 'VERTICAL',
		activeTab = $bindable()
	}: {
		entries: MenuEntry[];
		orientation: 'VERTICAL' | 'HORIZONTAL';
		activeTab: string;
	} = $props();
</script>

<div class="flex flex-row gap-6">
	<nav class={`flex ${orientation === 'VERTICAL' ? 'flex-col' : 'flex-row'} min-w-[20%] gap-0.5`}>
		{#each entries as entry}
			<button
				class={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium
					transition-all duration-200 ease-out
					focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
					${
						activeTab === entry.id
							? 'shadow-main/25 bg-main text-contrast-text shadow-sm'
							: 'hover:bg-surface-color/60 text-muted-foreground hover:text-contrast-text'
					}`}
				onclick={() => (activeTab = entry.id)}
			>
				{#if entry.icon}
					{@const Icon = entry.icon}
					<Icon width={16} class="fill-current" height={16} />
				{/if}
				{entry.label}
			</button>
		{/each}
	</nav>
	<div class="flex-1">
		<slot />
	</div>
</div>
