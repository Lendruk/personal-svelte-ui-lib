<script lang="ts">
	import LabeledComponent from './LabeledComponent.svelte';
	export let label: string | undefined = undefined;
	export let placeholder: string | undefined = undefined;
	export let value: number;

	export let min: number | undefined = undefined;
	export let max: number | undefined = undefined;
	export let step: number | undefined = undefined;
</script>

{#if label}
	<LabeledComponent>
		<div slot="label">{label}</div>
		<div slot="content" class="flex gap-2">
			<input
				class="border-main/40 hover:border-main/70 flex h-10 w-full
					rounded-lg border bg-dark-contrast px-3 text-sm
					text-contrast-text
					transition-all duration-200 ease-out
					[appearance:textfield] placeholder:text-muted-foreground focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ring
					focus:ring-offset-1
					focus:ring-offset-dark-contrast [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
				type="number"
				placeholder={placeholder ?? ''}
				{min}
				{max}
				{step}
				pattern="\d*"
				bind:value
			/><slot name="extra" />
		</div>
	</LabeledComponent>
{:else}
	<div class="flex gap-2">
		<input
			class="border-main/40 hover:border-main/70 flex h-10 w-full
				rounded-lg border bg-dark-contrast px-3 text-sm
				text-contrast-text
				transition-all duration-200 ease-out
				[appearance:textfield] placeholder:text-muted-foreground focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ring
				focus:ring-offset-1
				focus:ring-offset-dark-contrast [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
			type="number"
			placeholder={placeholder ?? ''}
			{min}
			{max}
			{step}
			pattern="\d*"
			bind:value
		/><slot name="extra" />
	</div>
{/if}
