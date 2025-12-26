<script lang="ts">
	import ChevronDown from '../icons/ChevronDown.svelte';
	import ChevronUp from '../icons/ChevronUp.svelte';
	import Tooltip from './Tooltip.svelte';

	type SimpleCol = {
		key: string;
		formatter?: (val: unknown) => string;
	};

	type Col = { header: string } & (
		| SimpleCol
		| { customRender: ConstructorOfATypedSvelteComponent }
	);

	type Row = {
		[index: string]: unknown;
		id?: string | number;
	};

	type Action = {
		icon: ConstructorOfATypedSvelteComponent;
		onClick: (id?: string | number) => void | Promise<void>;
		condition?: (row: Row) => boolean;
		name: string;
	};

	type OrderableOptions = {
		onMoveUp: (id?: string | number) => void | Promise<void>;
		onMoveDown: (id?: string | number) => void | Promise<void>;
	};

	export let rows: Row[] = [];
	export let cols: Col[] = [];
	export let actions: Action[] = [];
	export let orderable: OrderableOptions | undefined = undefined;
	export { cssClass as class };

	let showToolTip = false;
	let toolTipX = 0;
	let toolTipY = 0;
	let toolTipContent = '';
	let cssClass = '';

	function onMouseEnterAction(
		e: MouseEvent & { currentTarget: EventTarget & HTMLSpanElement },
		actionName: string
	) {
		toolTipContent = actionName;
		showToolTip = true;

		// This logic is duplicated from Tooltip.svelte - consider refactoring
		const rect = e.currentTarget.getBoundingClientRect();
		toolTipX = rect.x;

		if (toolTipX + e.currentTarget.clientWidth > window.innerWidth) {
			toolTipX = rect.right - e.currentTarget.clientWidth;
		}

		toolTipY = rect.top + window.scrollY + rect.height + 4;
	}

	function formatActionAvailability(row: Row, action: Action) {
		if (action.condition) {
			if (!action.condition(row)) {
				return `fill-zinc-400 hover:cursor-not-allowed`;
			}
		}
		return '';
	}

	function handleActionClick(row: Row, action: Action) {
		if (action.condition && !action.condition(row)) {
			return;
		}
		return action.onClick(row.id);
	}
</script>

<table class={`relative box-border flex flex-1 flex-col ${cssClass}`}>
	<Tooltip
		x={toolTipX}
		y={toolTipY}
		size="s"
		content={toolTipContent}
		visible={showToolTip}
		automaticMode={false}
	/>
	<thead class="bg-main flex flex-1 rounded-t-md p-2">
		<tr class="flex flex-1 justify-between">
			{#if orderable}
				<th class="flex flex-[0.2]">#</th>
			{/if}
			{#each cols as col, i}
				<th class={`flex flex-1 items-center  ${i !== 0 ? 'justify-end' : ''}`}>{col.header}</th>
			{/each}
			{#if actions.length > 0}
				<th class="flex flex-1" />
				<th class="flex flex-1 justify-end">Actions</th>
			{/if}
		</tr>
	</thead>
	<tbody class="box-border flex flex-col">
		{#if rows.length > 0}
			{#each rows as row, i}
				<tr
					class="odd:bg-dark-contrast box-border flex flex-1 justify-between pb-5 pl-2 pr-2 pt-5 hover:bg-zinc-700 hover:transition hover:duration-300"
				>
					{#if orderable}
						<td class="flex flex-[0.2] flex-col justify-center">
							{#if i == 0}
								<button on:click={() => orderable?.onMoveDown(row.id)}>
									<ChevronDown
										class="hover:fill-hover fill-white hover:cursor-pointer hover:transition"
									/>
								</button>
							{:else if i == rows.length - 1}
								<button on:click={() => orderable?.onMoveUp(row.id)}>
									<ChevronUp
										class="hover:fill-hover fill-white hover:cursor-pointer hover:transition"
									/>
								</button>
							{:else}
								<button on:click={() => orderable?.onMoveUp(row.id)}>
									<ChevronUp
										class="hover:fill-hover fill-white hover:cursor-pointer hover:transition"
									/>
								</button>
								<button on:click={() => orderable?.onMoveDown(row.id)}>
									<ChevronDown
										class="hover:fill-hover fill-white hover:cursor-pointer hover:transition"
									/>
								</button>
							{/if}
						</td>
					{/if}
					{#each cols as col, j}
						<td class={`flex flex-1 items-center ${j !== 0 ? 'justify-end' : ''}`}>
							{#if 'key' in col}
								{#if col.formatter}
									{col.formatter(row[col.key])}
								{:else}
									{row[col.key]}
								{/if}
							{:else}
								<svelte:component this={col.customRender} {row} />
							{/if}
						</td>
					{/each}
					{#if actions.length > 0}
						<td class="flex flex-1" />
						<td class="flex flex-1 items-center justify-end gap-4">
							{#each actions as action}
								<button
									on:mouseleave={() => {
										showToolTip = false;
									}}
									on:mouseenter={(e) => onMouseEnterAction(e, action.name)}
									class={`hover:fill-hover fill-white hover:cursor-pointer hover:transition ${formatActionAvailability(row, action)}`}
									on:click={() => handleActionClick(row, action)}
									><svelte:component this={action.icon} /></button
								>
							{/each}
						</td>
					{/if}
				</tr>
			{/each}
		{:else}
			<tr class="bg-surface-color flex flex-1 justify-center pb-5 pt-5">
				<td class="text-xl">No Items</td>
			</tr>
		{/if}
	</tbody>
</table>
