<script lang="ts">
	export let value: string | null | undefined = '';
	export let maxLength: number | undefined = undefined;

	$: currentLength = value?.length ?? 0;
	$: isNearLimit = typeof maxLength === 'number' && currentLength >= maxLength;
</script>

{#if typeof maxLength === 'number'}
	<div class={`self-end text-xs tabular-nums ${isNearLimit ? 'text-danger' : 'text-contrast-text/60'}`}>
		{currentLength}/{maxLength}
	</div>
{/if}
