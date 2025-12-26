<script lang="ts">
	export let value: string;
	export let onChange: (event: Event) => void = () => {};
	export let onKeyDown: (event: KeyboardEvent) => void = () => {};
	export let onKeyUp: (event: KeyboardEvent) => void = () => {};
	export let placeholder: string | undefined = undefined;
</script>

<textarea
	class="bg-dark-contrast rounded-md border-2 border-main pl-2 shadow-xl focus:outline-none"
	bind:value
	on:change={onChange}
	on:keydown={onKeyDown}
	on:keyup={onKeyUp}
	{placeholder}
></textarea>
