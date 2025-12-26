<script lang="ts">
	export type MenuEntry = {
		id: string;
		label: string;
		icon?: ConstructorOfATypedSvelteComponent;
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

<div class={`flex flex-row gap-4`}>
	<ul class={`flex ${orientation === 'VERTICAL' ? 'flex-col' : 'flex-row'} min-w-[20%]`}>
		{#each entries as entry}
			<li
				class={`${activeTab === entry.id ? 'bg-red-950' : ''} flex items-center gap-2 pb-1 pl-2 pt-1 `}
			>
				{#if entry.icon}
					{@const Icon = entry.icon}
					<Icon width={14} class="fill-white" height={14} color="#FFFFFF" />
				{/if}
				<button class="w-full text-start" onclick={() => (activeTab = entry.id)}
					>{entry.label}</button
				>
			</li>
		{/each}
	</ul>
	<slot />
</div>
