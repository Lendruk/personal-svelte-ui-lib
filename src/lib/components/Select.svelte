<script lang="ts">
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	export { cssClass as class };
	let cssClass = '';

	type $$Props = {
		value?: string;
		isLoading?: boolean;
		onchange?: (event: Event) => void;
	};

	export let value: string = '';
	export let isLoading: boolean = false;
	export let onchange: ((event: Event) => void) | undefined = undefined;
</script>

<div class="relative flex flex-1 items-center">
	<select
		on:change={(e) => onchange?.(e)}
		bind:value
		class={`border-main/40 hover:border-main/70 h-10 w-full cursor-pointer
			appearance-none rounded-lg border bg-dark-contrast px-3 pr-9
			text-sm
			text-contrast-text transition-all duration-200
			ease-out focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1
			focus:ring-offset-dark-contrast
			${cssClass}`}
	>
		<slot />
	</select>
	<div class="pointer-events-none absolute right-2.5 flex items-center">
		<svg
			class="h-4 w-4 text-muted-foreground"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	</div>
	{#if isLoading}
		<div
			class="bg-dark-contrast/60 absolute inset-0 flex items-center justify-between rounded-lg px-3 backdrop-blur-sm"
		>
			<span class="text-sm text-muted-foreground">Loading...</span>
			<LoadingSpinner width={18} height={18} />
		</div>
	{/if}
</div>
