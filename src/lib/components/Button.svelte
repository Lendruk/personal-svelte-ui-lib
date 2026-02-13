<script lang="ts">
	export let onClick = (event: MouseEvent) => {};

	export let isSelected = false;
	export let disabled = false;
	export let variant: 'primary' | 'secondary' | 'ghost' | 'danger' = 'primary';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	let className = '';
	export { className as class };

	const sizeClasses: Record<string, string> = {
		sm: 'h-8 px-3 text-sm gap-1.5',
		md: 'h-10 px-4 text-sm gap-2',
		lg: 'h-12 px-6 text-base gap-2.5'
	};

	const variantClasses: Record<string, string> = {
		primary:
			'bg-main text-contrast-text fill-contrast-text hover:bg-hover shadow-sm shadow-main/20',
		secondary:
			'bg-surface-color text-contrast-text fill-contrast-text hover:bg-dark-contrast border border-main/30',
		ghost: 'bg-transparent text-contrast-text fill-contrast-text hover:bg-surface-color',
		danger:
			'bg-danger text-contrast-text fill-contrast-text hover:bg-danger shadow-sm shadow-danger/20'
	};

	function formatClasses(): string {
		if (disabled) {
			return 'opacity-50 cursor-not-allowed pointer-events-none';
		}
		if (isSelected) {
			return 'bg-surface-color ring-2 ring-main ring-offset-1 ring-offset-dark-contrast';
		}
		return variantClasses[variant] ?? variantClasses.primary;
	}
</script>

<button
	class={`inline-flex items-center justify-center rounded-lg font-medium
		transition-all duration-200 ease-out
		focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-dark-contrast
		active:scale-[0.97]
		${sizeClasses[size]} ${className} ${formatClasses()}`}
	on:click={(e) => {
		if (!disabled) onClick(e);
	}}><slot /></button
>
