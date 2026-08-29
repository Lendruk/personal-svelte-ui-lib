<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		showModal?: boolean;
		class?: string;
		header?: Snippet;
		children?: Snippet;
	}

	let { showModal = $bindable(false), class: cssClass = '', header, children }: Props = $props();

	function closeModal(): void {
		showModal = false;
	}

	function handleBackdropClick(event: MouseEvent): void {
		if (event.target === event.currentTarget) {
			closeModal();
		}
	}

	function handleKeydown(event: KeyboardEvent): void {
		if (event.key === 'Escape') {
			event.preventDefault();
			event.stopPropagation();
			closeModal();
		}
	}
</script>

<svelte:window onkeydown={(event) => showModal && handleKeydown(event)} />
{#if showModal}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="modal-backdrop fixed inset-0 z-[10010] flex items-center justify-center overflow-y-auto bg-black/60 p-4"
		role="presentation"
		onclick={handleBackdropClick}
	>
		<div
			role="dialog"
			aria-modal="true"
			tabindex="-1"
			class={`modal-panel flex max-h-[calc(100vh-2rem)] min-h-[30%] w-fit min-w-[min(32rem,calc(100vw-2rem))] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-xl border border-main/20 bg-surface-color text-contrast-text shadow-2xl shadow-black/40 ${cssClass}`}
			onclick={(event) => event.stopPropagation()}
		>
			{@render header?.()}
			<div class="flex flex-1 min-h-0">
				{@render children?.()}
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		animation: backdrop-in 0.25s ease-out;
	}

	.modal-panel {
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

	@keyframes backdrop-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
