<script lang="ts">
	import XIcon from '$lib/icons/XIcon.svelte';
	import { onMount } from 'svelte';
	export let onDismissClick: () => void;
	export let content = '';
	export let dismissIn = 0;

	let curWidthPercentage = 100;
	let perTickWidthDecrease = 0;
	let progressBarRef: HTMLDivElement;
	onMount(() => {
		if (dismissIn !== 0) {
			perTickWidthDecrease = 100 / (dismissIn / 50);
			let interval = setInterval(() => {
				curWidthPercentage -= perTickWidthDecrease;

				if (curWidthPercentage <= 0) {
					clearInterval(interval);
					onDismissClick();
				}
			}, 50);
		}
	});
</script>

<div
	class="border-main/20 min-w-[280px] animate-toast-in overflow-hidden rounded-xl
	border bg-surface-color fill-contrast-text shadow-xl
	shadow-black/30"
>
	<div class="flex items-center justify-between gap-3 px-4 py-3">
		<p class="text-sm text-contrast-text">
			{content}
		</p>
		<button
			on:click={onDismissClick}
			class="shrink-0 rounded-md p-1
				transition-colors duration-150
				hover:bg-dark-contrast
				focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
		>
			<XIcon />
		</button>
	</div>
	<div class="h-1 w-full bg-dark-contrast">
		<div
			style={`width:${curWidthPercentage}%;`}
			bind:this={progressBarRef}
			class="h-full rounded-r-full bg-main transition-all duration-75 ease-linear"
		></div>
	</div>
</div>
