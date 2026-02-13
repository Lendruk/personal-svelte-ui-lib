<script lang="ts">
	import ChevronDown from '../icons/ChevronDown.svelte';

	export let header = '';
	export let open = false;
</script>

<div class="border-main/20 overflow-hidden rounded-lg border">
	<button
		class="hover:bg-surface-color/80 flex w-full items-center gap-2 bg-surface-color px-4
			py-3 text-sm font-medium
			text-contrast-text transition-colors
			duration-200
			focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
		on:click={() => (open = !open)}
	>
		<div class={`transition-transform duration-200 ${open ? 'rotate-180' : 'rotate-0'}`}>
			<ChevronDown class="h-4 w-4 fill-contrast-text" />
		</div>
		<span>{header}</span>
	</button>
	<div
		class={`overflow-hidden transition-all duration-300 ease-out
		${open ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
	>
		<div class="bg-surface-color/50 border-main/10 border-t p-4">
			<slot />
		</div>
	</div>
</div>
