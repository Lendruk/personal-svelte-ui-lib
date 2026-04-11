<script>
	export let width = 16;
	export let height = 16;
	export { cssClass as class };
	let cssClass = '';
</script>

<svg
	class={` ${cssClass}`}
	{height}
	{width}
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	><rect x="14" y="3" width="5" height="18" rx="1" /><rect
		x="5"
		y="3"
		width="5"
		height="18"
		rx="1"
	/></svg
>
