<script lang="ts">
	import LabeledComponent from './LabeledComponent.svelte';
	export let label: string;
	export let hasNumericInput: boolean = false;
	export let hasValueInLabel: boolean = false;
	export let value: number;
	export let min: number | undefined = undefined;
	export let max: number | undefined = undefined;
	export let step: number | undefined = undefined;
</script>

<LabeledComponent>
	<div slot="label" class="flex items-center justify-between">
		<span>
			{label}
			{#if hasValueInLabel}
				<span class="ml-1 text-muted-foreground">({value})</span>
			{/if}
		</span>
		{#if hasNumericInput}
			<input
				type="number"
				{min}
				{max}
				{step}
				bind:value
				class="border-main/40 h-7 w-16 rounded-md border bg-dark-contrast
pl-2 pr-2 text-right text-sm text-contrast-text
transition-all duration-200
[appearance:textfield] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1
focus:ring-offset-dark-contrast [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
			/>
		{/if}
	</div>
	<div slot="content" class="w-full pt-1">
		<input class="slider w-full" type="range" bind:value {min} {max} {step} />
	</div>
</LabeledComponent>

<style>
	.slider {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 20px;
		background: transparent;
		outline: none;
		cursor: pointer;
		margin: 0;
	}

	.slider::-webkit-slider-runnable-track {
		height: 6px;
		border-radius: 9999px;
		background: rgb(var(--color-dark-contrast));
	}

	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: rgb(var(--color-main));
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
		cursor: pointer;
		margin-top: -6px;
		transition:
			transform 0.15s ease,
			box-shadow 0.15s ease;
	}

	.slider::-webkit-slider-thumb:hover {
		transform: scale(1.15);
	}

	.slider::-webkit-slider-thumb:active {
		transform: scale(1.05);
	}

	.slider::-moz-range-track {
		height: 6px;
		border-radius: 9999px;
		background: rgb(var(--color-dark-contrast));
	}

	.slider::-moz-range-thumb {
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: rgb(var(--color-main));
		border: none;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
		cursor: pointer;
		transition: transform 0.15s ease;
	}

	.slider::-moz-range-thumb:hover {
		transform: scale(1.15);
	}
</style>
