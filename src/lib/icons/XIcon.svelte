<script>
	export let height = 16;
	export let width = 16;
	export let color = 'currentColor';
	export { cssClass as class };

	let cssClass = '';
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	class={cssClass}
	{height}
	{width}
	stroke={color}
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	fill="none"
	viewBox="0 0 24 24"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
>
