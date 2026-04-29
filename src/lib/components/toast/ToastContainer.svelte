<script context="module" lang="ts">
	import Toast from './Toast.svelte';
	export type ToastVariant = 'default' | 'warning' | 'error';
	export type ToastOptions = {
		dismissIn?: number;
		variant?: ToastVariant;
	};

	export type ToastDef = {
		id: number;
		content: string;
		dismissIn: number;
		variant: ToastVariant;
	};

	let toasts: ToastDef[] = $state([]);
	const TOAST_DEBOUNCE_MS = 1000;
	let nextToastId = 0;
	const lastToastAtByContent = new Map<string, number>();

	function pruneDebouncedToasts(now: number) {
		for (const [content, createdAt] of lastToastAtByContent) {
			if (now - createdAt >= TOAST_DEBOUNCE_MS) {
				lastToastAtByContent.delete(content);
			}
		}
	}

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
		const createdAt = Date.now();
		const normalizedContent = content.trim();
		pruneDebouncedToasts(createdAt);
		const lastToastAt = lastToastAtByContent.get(normalizedContent);
		if (lastToastAt !== undefined && createdAt - lastToastAt < TOAST_DEBOUNCE_MS) {
			return;
		}

		const dismissIn = typeof options === 'number' ? options : (options.dismissIn ?? 2500);
		const variant =
			typeof options === 'number'
				? (legacyVariant ?? inferToastVariant(content))
				: (options.variant ?? inferToastVariant(content));
		const id = nextToastId++;
		lastToastAtByContent.set(normalizedContent, createdAt);
		toasts.push({ id, content, dismissIn, variant });
	};

	function removeToast(toast: ToastDef) {
		const index = toasts.findIndex((t) => t.id === toast.id);
		if (index !== -1) {
			toasts.splice(index, 1);
		}
	}
</script>

<div
	class="fixed bottom-4 right-4 z-[2147483647] flex flex-col-reverse gap-2 pointer-events-none"
	aria-live="polite"
	aria-atomic="true"
>
	{#each toasts as toast (toast.id)}
		<Toast
			onDismissClick={() => removeToast(toast)}
			content={toast.content}
			dismissIn={toast.dismissIn}
			variant={toast.variant}
		/>
	{/each}
</div>
