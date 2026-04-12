<script lang="ts">
	let {
		isDrawerOpen = $bindable(false),
		onDrawerClose = () => {}
	}: {
		isDrawerOpen?: boolean;
		onDrawerClose?: () => void;
	} = $props();

	function close() {
		isDrawerOpen = false;
		onDrawerClose();
	}

	function onKeyPress(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			close();
		}
	}
</script>

{#if isDrawerOpen}
	<div class="fixed inset-0 flex" style="z-index: 10000;">
		<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
		<div onclick={close} class="flex-1 animate-fade-in bg-black/50 backdrop-blur-sm"></div>
		<div
			class="flex h-full w-full max-w-md animate-slide-in-right flex-col
			border-l border-main/20
			bg-dark-contrast shadow-2xl
			shadow-black/50"
		>
			<slot />
		</div>
	</div>
{/if}

<svelte:window onkeydown={onKeyPress} />
