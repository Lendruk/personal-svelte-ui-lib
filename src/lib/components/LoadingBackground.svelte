<script>
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
</script>

<div
	class="bg-dark-contrast/40 absolute inset-0 z-10 flex animate-fade-in items-center
		justify-center rounded-lg
		backdrop-blur-sm"
>
	<div class="flex flex-col items-center gap-3">
		<LoadingSpinner />
		<span class="text-sm text-muted-foreground">Loading...</span>
	</div>
</div>
