<script lang="ts">
	export let checked: boolean;
	export let inlineLabel: string | undefined;
</script>

<button
	on:click={() => (checked = !checked)}
	class="hover:bg-surface-color/50 group inline-flex items-center gap-3 rounded-lg px-3
		py-2 transition-all duration-200
		ease-out
		focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-dark-contrast
		active:scale-[0.98]"
>
	{#if inlineLabel}
		<span class="select-none text-sm text-contrast-text">{inlineLabel}</span>
	{/if}
	<div
		class={`relative flex h-5 w-9 shrink-0 items-center rounded-full
		transition-colors duration-200 ease-out
		${checked ? 'shadow-main/30 bg-main shadow-sm' : 'border-main/30 border bg-dark-contrast'}`}
	>
		<span
			class={`pointer-events-none block h-3.5 w-3.5 rounded-full bg-contrast-text shadow-sm
			transition-transform duration-200 ease-out
			${checked ? 'translate-x-4' : 'translate-x-0.5'}`}
		/>
	</div>
</button>
