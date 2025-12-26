<script lang="ts">
	import { onMount } from 'svelte';
	let {
		content = '',
		visible = false,
		automaticMode = true,
		x = 0,
		y = 0,
		size = 'm'
	}: {
		content?: string;
		visible?: boolean;
		automaticMode?: boolean;
		x?: number;
		y?: number;
		size?: 's' | 'm';
	} = $props();

	let contentDiv: HTMLElement;
	let toolTipDiv: HTMLDivElement;

	function onMouseEnter() {
		visible = true;
		if (automaticMode) {
			const rect = contentDiv.getBoundingClientRect();
			x = rect.x;
	
			if (x + toolTipDiv.clientWidth > window.innerWidth) {
				x = rect.right - toolTipDiv.clientWidth;
			}
	
			y = rect.top + window.scrollY + rect.height + 4;
		}
	}

	function onMouseLeave() {
		visible = false;
	}

	const sizeMap = {
		xs: {
			minW: 40,
			minH: 20,
			pt: 1,
			pb: 1,
			pl: 2,
			pr: 2,
			textSize: 'xs'
		},
		s: {
			minW: 40,
			minH: 20,
			pt: 1,
			pb: 1,
			pl: 2,
			pr: 2,
			textSize: 'sm'
		},
		m: {
			minW: 80,
			minH: 30,
			pt: 4,
			pb: 4,
			pl: 4,
			pr: 4,
			textSize: 'm'
		}
	};

	onMount(() => {
		if (automaticMode) {
			contentDiv = toolTipDiv.nextSibling?.nextSibling as HTMLElement;
			contentDiv.addEventListener('mouseenter', onMouseEnter);
			contentDiv.addEventListener('mouseleave', onMouseLeave);
		}
	});
</script>

<div
	bind:this={toolTipDiv}
	style={`top:${y}px; left:${x}px`}
	class={`fixed 
	z-50
	min-h-[${sizeMap[size].minH}px] 
	min-w-[${sizeMap[size].minW}px] 
	flex-1 
	justify-center 
	rounded-lg 
	border-2 
	border-hover 
	bg-dark-contrast
	border-main
	bg-opacity-90 
	pt-${sizeMap[size].pt} 
	pb-${sizeMap[size].pb} 
	pl-${sizeMap[size].pl} 
	pr-${sizeMap[size].pr}
	text-${sizeMap[size].textSize}
	transition 
	duration-300 
	${!visible ? 'invisible' : 'flex'} items-center`}
>
	{content}
	<slot name="toolTipContent" />
</div>
<slot name="target" />
