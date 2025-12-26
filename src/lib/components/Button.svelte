<script lang="ts">
	export let onClick = () => {};

	export let isSelected = false;
	export let disabled = false;
	let className = '';
	export { className as class };

	function formatClasses(): string {
		if (isSelected) {
			if (disabled) {
				return 'bg-surface-color cursor-not-allowed text-main';
			}
			return 'bg-surface-color';
		}

		if (disabled) {
			return 'fill-surface-color cursor-not-allowed text-main';
		}

		return '';
	}
</script>

<button
	class={`flex text-center justify-center items-center rounded-md pl-4 pr-4 h-[40px] fill-white bg-main text-white hover:bg-hover hover:transition ${className} ${formatClasses()}`}
	on:click={() => {
		if (!disabled) onClick();
	}}><slot /></button
>
