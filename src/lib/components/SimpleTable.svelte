<script lang="ts">
	import ChevronDown from '../icons/ChevronDown.svelte';
	import ChevronUp from '../icons/ChevronUp.svelte';
	import LoadingSpinner from './LoadingSpinner.svelte';
	import Tooltip from './Tooltip.svelte';

	type Align = 'left' | 'center' | 'right';

	type Col = {
		header: string;
		align?: Align;
	} & (SimpleCol | { customRender: ConstructorOfATypedSvelteComponent });

	type SimpleCol = {
		key: string;
		formatter?: (val: unknown) => string;
	};

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
	let columnAlignments: Align[] = [];

	const alignClassMap: Record<Align, string> = {
		left: 'text-left',
		center: 'text-center',
		right: 'text-right'
	};

	$: totalCols = cols.length + (orderable ? 1 : 0) + (actions.length > 0 ? 1 : 0);
	$: columnAlignments = cols.map((col) => getColumnAlign(col));

	function onMouseEnterAction(
		e: MouseEvent & { currentTarget: EventTarget & HTMLElement },
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

	function getColumnAlign(col: Col): Align {
		if (col.align) {
			return col.align;
		}

		if (!('key' in col)) {
			return 'left';
		}

		const definedValues = rows
			.map((row) => row[col.key])
			.filter((value) => value !== null && value !== undefined);

		if (definedValues.length > 0 && definedValues.every((value) => typeof value === 'number')) {
			return 'right';
		}

		return 'left';
	}

	function isActionDisabled(row: Row, action: Action) {
		return Boolean(action.condition && !action.condition(row));
	}

	function handleActionClick(row: Row, action: Action) {
		if (isActionDisabled(row, action)) {
			return;
		}
		return action.onClick(row.id);
	}
</script>

<div
	class={`simple-table-shell relative box-border overflow-hidden rounded-2xl border ${cssClass}`}
	aria-busy={loading}
>
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
			class="simple-table-overlay pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-4"
		>
			<div
				class="flex min-w-[10rem] flex-col items-center gap-3 rounded-2xl border border-white/[0.08] bg-black/15 px-5 py-4 text-center shadow-lg shadow-black/20"
			>
				<LoadingSpinner />
				{#if rows.length === 0}
					<span class="text-sm font-medium text-[rgb(var(--table-text-secondary))]">Loading...</span
					>
				{/if}
			</div>
		</div>
	{/if}
	<div class="overflow-x-auto">
		<table
			class="min-w-full border-collapse text-sm"
			class:opacity-60={loading}
			class:transition-opacity={loading}
		>
			<thead class="simple-table-head">
				<tr class="border-b border-[rgb(var(--table-border)/0.12)]">
					{#if orderable}
						<th
							scope="col"
							class="w-20 whitespace-nowrap px-3 py-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-[rgb(var(--table-text-faint))] sm:px-4"
						>
							Move
						</th>
					{/if}
					{#each cols as col, i}
						<th
							scope="col"
							class={`whitespace-nowrap px-3 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[rgb(var(--table-text-faint))] sm:px-4 ${alignClassMap[columnAlignments[i]]}`}
						>
							{col.header}
						</th>
					{/each}
					{#if actions.length > 0}
						<th
							scope="col"
							class="w-[1%] whitespace-nowrap px-3 py-3.5 text-right text-[11px] font-semibold uppercase tracking-[0.18em] text-[rgb(var(--table-text-faint))] sm:px-4"
						>
							Actions
						</th>
					{/if}
				</tr>
			</thead>
			<tbody class="divide-y divide-[rgb(var(--table-border)/0.08)]">
				{#if rows.length > 0}
					{#each rows as row, i (row.id ?? i)}
						<tr class="group transition-colors duration-150 hover:bg-white/[0.04]">
							{#if orderable}
								<td class="px-3 py-3 align-middle sm:px-4">
									<div class="flex items-center gap-1.5">
										<button
											type="button"
											class="simple-table-icon-button h-8 w-8"
											disabled={i === 0}
											aria-label={`Move row ${i + 1} up`}
											title="Move up"
											on:click={() => orderable?.onMoveUp(row.id)}
										>
											<ChevronUp class="h-3.5 w-3.5 fill-current" />
										</button>
										<button
											type="button"
											class="simple-table-icon-button h-8 w-8"
											disabled={i === rows.length - 1}
											aria-label={`Move row ${i + 1} down`}
											title="Move down"
											on:click={() => orderable?.onMoveDown(row.id)}
										>
											<ChevronDown class="h-3.5 w-3.5 fill-current" />
										</button>
									</div>
								</td>
							{/if}
							{#each cols as col, j}
								<td
									class={`px-3 py-3.5 align-middle leading-6 text-[rgb(var(--table-text-secondary))] sm:px-4 ${alignClassMap[columnAlignments[j]]}`}
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
								<td class="px-3 py-3 align-middle sm:px-4">
									<div class="flex items-center justify-end gap-2">
										{#each actions as action (action.name)}
											{@const actionDisabled = isActionDisabled(row, action)}
											<button
												type="button"
												class="simple-table-icon-button h-9 w-9"
												disabled={actionDisabled}
												aria-label={action.name}
												title={action.name}
												on:mouseleave={() => {
													showToolTip = false;
												}}
												on:mouseenter={(e) => {
													if (!actionDisabled) {
														onMouseEnterAction(e, action.name);
													}
												}}
												on:click={() => handleActionClick(row, action)}
											>
												<svelte:component this={action.icon} class="h-4 w-4 fill-current" />
											</button>
										{/each}
									</div>
								</td>
							{/if}
						</tr>
					{/each}
				{:else}
					<tr>
						<td colspan={totalCols} class="px-4 py-14 text-center">
							{#if loading}
								&nbsp;
							{:else}
								<div class="flex flex-col items-center gap-1.5">
									<span class="text-sm font-medium text-[rgb(var(--table-text-secondary))]"
										>No items found</span
									>
									<span class="text-xs text-[rgb(var(--table-text-faint))]"
										>Rows will appear here when data becomes available.</span
									>
								</div>
							{/if}
						</td>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>
</div>

<style>
	.simple-table-shell {
		--table-surface: var(--theme-surface, var(--color-surface-color, 39 39 42));
		--table-surface-deep: var(--theme-surface-deep, var(--color-dark-contrast, 24 24 27));
		--table-text-primary: var(--theme-text-primary, var(--color-contrast-text, 244 244 245));
		--table-text-secondary: var(--theme-text-secondary, var(--color-contrast-text, 228 228 231));
		--table-text-muted: var(--theme-text-muted, var(--color-muted-foreground, 161 161 170));
		--table-text-faint: var(--theme-text-faint, var(--color-muted-foreground, 113 113 122));
		--table-border: var(--theme-border, var(--color-main, 239 68 68));
		--table-border-accent: var(
			--theme-border-accent,
			var(--color-ring, var(--color-main, 239 68 68))
		);
		background: linear-gradient(180deg, rgb(255 255 255 / 0.025), transparent 42%),
			rgb(var(--table-surface) / 0.82);
		border-color: rgb(var(--table-border) / 0.18);
		box-shadow: 0 18px 40px -30px rgba(0, 0, 0, 0.55);
		backdrop-filter: blur(18px);
	}

	.simple-table-head {
		background: linear-gradient(180deg, rgb(255 255 255 / 0.03), transparent),
			rgb(var(--table-surface-deep) / 0.88);
	}

	.simple-table-overlay {
		background: rgb(var(--table-surface-deep) / 0.56);
		backdrop-filter: blur(3px);
	}

	.simple-table-icon-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.75rem;
		border: 1px solid rgb(255 255 255 / 0.06);
		background: rgb(255 255 255 / 0.04);
		color: rgb(var(--table-text-muted));
		transition:
			background-color 150ms ease,
			border-color 150ms ease,
			color 150ms ease,
			transform 150ms ease;
	}

	.simple-table-icon-button:hover:not(:disabled) {
		transform: translateY(-1px);
		border-color: rgb(255 255 255 / 0.12);
		background: rgb(255 255 255 / 0.08);
		color: rgb(var(--table-text-primary));
	}

	.simple-table-icon-button:focus-visible {
		outline: 2px solid rgb(var(--table-border-accent) / 0.7);
		outline-offset: 2px;
	}

	.simple-table-icon-button:disabled {
		cursor: not-allowed;
		background: rgb(255 255 255 / 0.02);
		color: rgb(var(--table-text-faint));
		opacity: 0.42;
	}
</style>
