<script lang="ts">
	export { cssClass as class };
	let cssClass = '';
</script>

<div class={`flex flex-col gap-1.5 ${cssClass}`}>
	<div class="text-sm font-medium text-muted-foreground">
		<slot name="label" />
	</div>
	<slot name="content" />
</div>
