<script context="module" lang="ts">
	import Toast from './Toast.svelte';
	export type ToastVariant = 'default' | 'warning' | 'error';
	export type ToastOptions = {
		dismissIn?: number;
		variant?: ToastVariant;
	};

	export type ToastDef = {
		content: string;
		dismissIn: number;
		createdAt: number;
		variant: ToastVariant;
	};

	let toasts: ToastDef[] = $state([]);

	function inferToastVariant(content: string): ToastVariant {
		const normalizedContent = content.trim().toLowerCase();
		if (normalizedContent.includes('failed') || normalizedContent.includes('error')) {
			return 'error';
		}

		return 'default';
	}

	export const createToast = (
		content: string,
		options: number | ToastOptions = 2500,
		legacyVariant?: ToastVariant
	) => {
		const dismissIn = typeof options === 'number' ? options : (options.dismissIn ?? 2500);
		const variant =
			typeof options === 'number'
				? (legacyVariant ?? inferToastVariant(content))
				: (options.variant ?? inferToastVariant(content));
		const createdAt = new Date().getUTCMilliseconds();
		toasts.push({ content, dismissIn, createdAt, variant });
		// setTimeout(() => {
		//   const index = toasts.findIndex(t => t.createdAt === createdAt);
		//   toasts.splice(index, 1);
		// }, dismissIn);
	};

	function removeToast(toast: ToastDef) {
		const index = toasts.findIndex((t) => t.createdAt === toast.createdAt);
		toasts.splice(index, 1);
	}
</script>

<div
	class="fixed bottom-4 right-4 z-[2147483647] flex flex-col-reverse gap-2 pointer-events-none"
	aria-live="polite"
	aria-atomic="true"
>
	{#each toasts as toast, i (i)}
		<Toast
			onDismissClick={() => removeToast(toast)}
			content={toast.content}
			dismissIn={toast.dismissIn}
			variant={toast.variant}
		/>
	{/each}
</div>
