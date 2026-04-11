<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		showModal?: boolean;
		class?: string;
		header?: Snippet;
		children?: Snippet;
	}

	let { showModal = $bindable(false), class: cssClass = '', header, children }: Props = $props();

	let dialog: HTMLDialogElement;

	$effect(() => {
		if (dialog && showModal) dialog.showModal();
		else if (dialog && !showModal) dialog.close();
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => {
		if (e.target === dialog) dialog.close();
	}}
	class={`flex min-h-[30%] flex-1 flex-col rounded-xl
		border border-main/20
		bg-surface-color text-contrast-text shadow-2xl shadow-black/40
		${showModal ? '' : 'hidden'} ${cssClass}`}
>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="flex flex-1 flex-col" onclick={(e) => e.stopPropagation()}>
		{@render header?.()}
		<div class="flex flex-1">
			{@render children?.()}
		</div>
	</div>
</dialog>

<style>
	dialog:not([open]) {
		display: none !important;
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(4px);
	}

	dialog[open] {
		animation: modal-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}

	@keyframes modal-in {
		from {
			opacity: 0;
			transform: scale(0.95) translateY(8px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	dialog[open]::backdrop {
		animation: backdrop-in 0.25s ease-out;
	}

	@keyframes backdrop-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
