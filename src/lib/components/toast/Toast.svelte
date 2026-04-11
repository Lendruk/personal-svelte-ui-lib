<script lang="ts">
	import XIcon from '$lib/icons/XIcon.svelte';
	import { onMount } from 'svelte';
	type ToastVariant = 'default' | 'warning' | 'error';
	type ToastTone = {
		container: string;
		dismissButton: string;
		indicator: string;
		progressBar: string;
	};

	export let onDismissClick: () => void;
	export let content = '';
	export let dismissIn = 0;
	export let variant: ToastVariant = 'default';

	const TOAST_TONES: Record<ToastVariant, ToastTone> = {
		default: {
			container: 'border-main/20 bg-surface-color',
			dismissButton:
				'text-contrast-text/70 hover:bg-dark-contrast hover:text-contrast-text',
			indicator: 'bg-main',
			progressBar: 'bg-main'
		},
		warning: {
			container: 'border-warning/30 bg-warning/10',
			dismissButton: 'text-warning/80 hover:bg-warning/15 hover:text-warning',
			indicator: 'bg-warning',
			progressBar: 'bg-warning'
		},
		error: {
			container: 'border-danger/30 bg-danger/10',
			dismissButton: 'text-danger/80 hover:bg-danger/15 hover:text-danger',
			indicator: 'bg-danger',
			progressBar: 'bg-danger'
		}
	};

	let curWidthPercentage = 100;
	let perTickWidthDecrease = 0;
	let progressBarRef: HTMLDivElement;
	$: tone = TOAST_TONES[variant] ?? TOAST_TONES.default;

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
	class={`min-w-[280px] animate-toast-in overflow-hidden rounded-xl border shadow-xl shadow-black/30 ${tone.container}`}
>
	<div class="flex items-start justify-between gap-3 px-4 py-3">
		<div class="flex min-w-0 items-start gap-3">
			<div class={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${tone.indicator}`}></div>
			<p class="text-sm text-contrast-text">
				{content}
			</p>
		</div>
		<button
			on:click={onDismissClick}
			class={`shrink-0 rounded-md p-1 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${tone.dismissButton}`}
		>
			<XIcon />
		</button>
	</div>
	<div class="h-1 w-full bg-dark-contrast">
		<div
			style={`width:${curWidthPercentage}%;`}
			bind:this={progressBarRef}
			class={`h-full rounded-r-full transition-all duration-75 ease-linear ${tone.progressBar}`}
		></div>
	</div>
</div>
