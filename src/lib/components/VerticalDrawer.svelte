<script lang="ts">
	let {
		isDrawerOpen = $bindable(false),
		onDrawerClose = () => {}
	}: {
		isDrawerOpen?: boolean;
		onDrawerClose?: () => void;
	} = $props();

	function onKeyPress(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			isDrawerOpen = false;
			onDrawerClose();
		}
	}
</script>

<div class={`${isDrawerOpen ? 'flex' : 'hidden'} absolute right-0 top-0 z-[40] flex h-full w-full`}>
	<div
		on:click={() => (isDrawerOpen = false)}
		class="flex flex-1 bg-surface-color bg-opacity-90 backdrop-blur-sm"
	></div>
	<div class="flex h-full flex-1 self-end bg-dark-contrast">
		<slot />
	</div>
</div>

<svelte:window on:keydown={onKeyPress} />
