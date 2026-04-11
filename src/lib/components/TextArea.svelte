<script lang="ts">
	import CharacterCount from './CharacterCount.svelte';

	export let value: string;
	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let onChange: (event: Event) => void = () => {};
	export let onKeyDown: (event: KeyboardEvent) => void = () => {};
	export let onKeyUp: (event: KeyboardEvent) => void = () => {};
	export let placeholder: string | undefined = undefined;
	export let rows: number = 3;
	export let disabled: boolean = false;
	export let maxLength: number | undefined = undefined;
</script>

<div class="flex w-full flex-col gap-1">
	<textarea
		class="border-main/40 hover:border-main/70 min-h-[80px]
			w-full resize-y rounded-lg border bg-dark-contrast px-3
			py-2.5
			text-sm text-contrast-text transition-all
			duration-200 ease-out placeholder:text-muted-foreground focus:border-transparent focus:outline-none focus:ring-2
			focus:ring-ring
			focus:ring-offset-1 focus:ring-offset-dark-contrast"
		{id}
		{name}
		{disabled}
		bind:value
		on:change={onChange}
		on:keydown={onKeyDown}
		on:keyup={onKeyUp}
		maxlength={maxLength}
		{placeholder}
		{rows}
	></textarea>
	<CharacterCount {value} {maxLength} />
</div>
