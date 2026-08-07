<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

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

	let toolTipDiv: HTMLDivElement;
	let targetWrapper: HTMLDivElement;
	let portalTarget: HTMLDivElement;

	function onMouseEnter() {
		visible = true;
		if (automaticMode && targetWrapper) {
			const rect = targetWrapper.getBoundingClientRect();
			x = rect.x;

			if (portalTarget && x + portalTarget.clientWidth > window.innerWidth) {
				x = rect.right - portalTarget.clientWidth;
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
		// Portal the tooltip to document.body so it escapes any containing block
		// created by ancestor CSS (backdrop-filter, transform, filter, etc.)
		if (toolTipDiv) {
			portalTarget = toolTipDiv;
			document.body.appendChild(toolTipDiv);
		}
	});

	onDestroy(() => {
		if (portalTarget && portalTarget.parentNode) {
			portalTarget.parentNode.removeChild(portalTarget);
		}
	});
</script>

<!--
	The tooltip lives inside this wrapper so that the node we portal away in
	onMount is never the first or last node of this component's fragment.
	Svelte removes a destroyed fragment by walking from its first node to its
	last one; if the first node has been moved to <body>, that walk ends
	immediately and everything after it (i.e. the target) is orphaned in the DOM.
-->
<div style="display: contents">
	<div
		bind:this={toolTipDiv}
		style={`top:${y}px; left:${x}px`}
		class={`border-main/30 fixed
			z-50 rounded-lg border
			bg-dark-contrast px-3 py-1.5
			text-sm text-contrast-text
			shadow-lg shadow-black/30
			transition-[opacity,transform] duration-150
			${size === 's' ? 'px-2 py-1 text-xs' : ''}
			${!visible ? 'invisible scale-95 opacity-0' : 'flex scale-100 opacity-100'}
			items-center`}
	>
		{content}
		<slot name="toolTipContent" />
	</div>
</div>
{#if automaticMode}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		bind:this={targetWrapper}
		onmouseenter={onMouseEnter}
		onmouseleave={onMouseLeave}
		class="inline-block"
	>
		<slot name="target" />
	</div>
{:else}
	<slot name="target" />
{/if}
