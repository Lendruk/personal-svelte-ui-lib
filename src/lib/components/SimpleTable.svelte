<script lang="ts">
	import ChevronDown from '../icons/ChevronDown.svelte';
	import ChevronUp from '../icons/ChevronUp.svelte';
	import LoadingSpinner from './LoadingSpinner.svelte';
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
	export let loading = false;
	export { cssClass as class };

	let showToolTip = false;
	let toolTipX = 0;
	let toolTipY = 0;
	let toolTipContent = '';
	let cssClass = '';

	$: totalCols = cols.length + (orderable ? 1 : 0) + (actions.length > 0 ? 2 : 0);

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
				return `fill-muted hover:cursor-not-allowed`;
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

<div class={`border-main/20 relative box-border overflow-hidden rounded-lg border ${cssClass}`}>
	<Tooltip
		x={toolTipX}
		y={toolTipY}
		size="s"
		content={toolTipContent}
		visible={showToolTip}
		automaticMode={false}
	/>
	{#if loading}
		<div
			class="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-md"
		>
			<div class="flex flex-col items-center gap-2">
				<LoadingSpinner />
				{#if rows.length === 0}
					<span class="text-xl">Loading...</span>
				{/if}
			</div>
		</div>
	{/if}
	<table
		class="w-full border-collapse text-sm"
		class:blur-sm={loading}
		class:opacity-50={loading}
		class:transition-all={loading}
	>
		<thead>
			<tr class="border-main/20 border-b">
				{#if orderable}
					<th
						class="w-12 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
						>#</th
					>
				{/if}
				{#each cols as col, i}
					<th
						class={`px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground ${i !== 0 ? 'text-right' : 'text-left'}`}
						>{col.header}</th
					>
				{/each}
				{#if actions.length > 0}
					<th class="px-4 py-3" />
					<th
						class="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground"
						>Actions</th
					>
				{/if}
			</tr>
		</thead>
		<tbody class="divide-main/10 divide-y">
			{#if rows.length > 0}
				{#each rows as row, i}
					<tr class="hover:bg-surface-color/40 transition-colors duration-150">
						{#if orderable}
							<td class="w-12 px-4 py-3 align-middle">
								<div class="flex flex-col items-center gap-0.5">
									{#if i == 0}
										<button
											class="rounded p-0.5 transition-colors hover:bg-dark-contrast"
											on:click={() => orderable?.onMoveDown(row.id)}
										>
											<ChevronDown class="h-3.5 w-3.5 fill-muted-foreground hover:fill-contrast-text" />
										</button>
									{:else if i == rows.length - 1}
										<button
											class="rounded p-0.5 transition-colors hover:bg-dark-contrast"
											on:click={() => orderable?.onMoveUp(row.id)}
										>
											<ChevronUp class="h-3.5 w-3.5 fill-muted-foreground hover:fill-contrast-text" />
										</button>
									{:else}
										<button
											class="rounded p-0.5 transition-colors hover:bg-dark-contrast"
											on:click={() => orderable?.onMoveUp(row.id)}
										>
											<ChevronUp class="h-3.5 w-3.5 fill-muted-foreground hover:fill-contrast-text" />
										</button>
										<button
											class="rounded p-0.5 transition-colors hover:bg-dark-contrast"
											on:click={() => orderable?.onMoveDown(row.id)}
										>
											<ChevronDown class="h-3.5 w-3.5 fill-muted-foreground hover:fill-contrast-text" />
										</button>
									{/if}
								</div>
							</td>
						{/if}
						{#each cols as col, j}
							<td
								class={`px-4 py-3 ${j !== 0 ? 'text-right' : 'text-left'} align-middle text-contrast-text`}
							>
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
							<td class="px-4 py-3" />
							<td class="px-4 py-3 text-right align-middle">
								<div class="flex items-center justify-end gap-1">
									{#each actions as action}
										<button
											on:mouseleave={() => {
												showToolTip = false;
											}}
											on:mouseenter={(e) => onMouseEnterAction(e, action.name)}
											class={`hover:bg-surface-color/60 rounded-md fill-muted-foreground p-1.5 transition-all
												duration-150 hover:fill-contrast-text
												${formatActionAvailability(row, action)}`}
											on:click={() => handleActionClick(row, action)}
											><svelte:component this={action.icon} /></button
										>
									{/each}
								</div>
							</td>
						{/if}
					</tr>
				{/each}
			{:else}
				<tr>
					<td colspan={totalCols} class="py-12 text-center">
						{#if loading}
							&nbsp;
						{:else}
							<span class="text-muted-foreground">No items found</span>
						{/if}
					</td>
				</tr>
			{/if}
		</tbody>
	</table>
</div>
