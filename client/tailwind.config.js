/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				ghostbg: 'var(--fallback-bc,oklch(var(--bc)/0.2))',
			},
		},
	},
	plugins: [daisyui],
}

