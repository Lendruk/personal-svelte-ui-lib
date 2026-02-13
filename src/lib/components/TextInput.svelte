<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';

	export let value: string;
	export let placeholder: string | undefined = undefined;
	export let disabled: boolean = false;
	export let isBlurred = false;

	const dispatch = createEventDispatcher();
</script>

<div class="relative flex items-center gap-2">
	<input
		class={`border-main/40 hover:border-main/70 flex h-10 w-full
			rounded-lg border bg-dark-contrast px-3 text-sm
			text-contrast-text
			transition-all duration-200 ease-out
			placeholder:text-muted-foreground focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1
			focus:ring-offset-dark-contrast
			${disabled ? 'cursor-not-allowed opacity-50' : ''}
			${isBlurred ? 'select-none blur-md' : ''}`}
		type="text"
		{disabled}
		placeholder={placeholder ?? ''}
		bind:value
		on:input={(e) => dispatch('input', e)}
	/>
	{#if isBlurred}
		<div class="absolute inset-0 flex items-center justify-center">
			<Button variant="ghost" size="sm" onClick={() => (isBlurred = false)}>Show</Button>
		</div>
	{/if}
</div>
