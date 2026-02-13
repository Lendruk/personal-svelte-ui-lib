<script lang="ts">
	export { cssClass as class };
	let cssClass = '';
	export let isSelected = false;
	export let href: string;
	export let target: string | undefined = undefined;
</script>

<a
	{href}
	{target}
	class={`shadow-main/20 hover:shadow-main/30 inline-flex items-center justify-center rounded-lg
		bg-main px-4 py-2.5 text-sm
		font-medium text-contrast-text
		shadow-sm transition-all duration-200
		ease-out hover:bg-hover hover:shadow-md
		focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-dark-contrast
		active:scale-[0.97]
		${cssClass} ${isSelected ? 'bg-surface-color ring-2 ring-main' : ''}`}><slot /></a
>
