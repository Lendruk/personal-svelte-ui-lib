import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				main: 'rgb(var(--color-main) / <alpha-value>)',
				'main-hover': 'rgb(var(--color-main-hover) / <alpha-value>)',
				hover: 'rgb(var(--color-hover) / <alpha-value>)',
				surface: 'rgb(var(--color-surface) / <alpha-value>)',
				'surface-color': 'rgb(var(--color-surface-color) / <alpha-value>)',
				'dark-contrast': 'rgb(var(--color-dark-contrast) / <alpha-value>)',
				accent: 'rgb(var(--color-accent) / <alpha-value>)',
				muted: 'rgb(var(--color-muted) / <alpha-value>)',
				'muted-foreground': 'rgb(var(--color-muted-foreground) / <alpha-value>)',
				danger: 'rgb(var(--color-danger) / <alpha-value>)',
				success: 'rgb(var(--color-success) / <alpha-value>)',
				ring: 'rgb(var(--color-ring) / <alpha-value>)',
				'contrast-text': 'rgb(var(--color-contrast-text) / <alpha-value>)',
			},
			borderRadius: {
				DEFAULT: '0.5rem'
			},
			transitionDuration: {
				DEFAULT: '200ms'
			},
			keyframes: {
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-out-right': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(8px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'toast-in': {
					'0%': { transform: 'translateX(100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				}
			},
			animation: {
				'slide-in-right': 'slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
				'slide-out-right': 'slide-out-right 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
				'fade-in': 'fade-in 0.2s ease-out',
				'fade-out': 'fade-out 0.2s ease-out',
				'slide-up': 'slide-up 0.2s ease-out',
				'toast-in': 'toast-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
			}
		}
	},

	plugins: []
} satisfies Config;
