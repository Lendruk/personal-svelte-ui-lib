<script lang="ts">
	export let showModal = false;
	export { cssClass as class };

	let cssClass = '';
	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
	$: if (dialog && !showModal) dialog.close();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	class={`border-main/20 flex min-h-[30%] min-w-[30%] flex-col
		rounded-xl border
		bg-surface-color text-contrast-text shadow-2xl shadow-black/40
		${showModal ? '' : 'hidden'} ${cssClass}`}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="flex flex-1 flex-col" on:click|stopPropagation>
		<slot name="header" />
		<div class="flex flex-1 p-6">
			<slot />
		</div>
	</div>
</dialog>

<style>
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
