/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'second-red': '#ed5858',
				'grey-50': '#f6f6f6ff',
				'grey-100': '#eaeaeaff',
				'grey-200': '#dcdcdcff',
				'grey-300': '#c8c8c8ff',
				'grey-400': '#a2a2a2ff',
				'grey-500': '#808080ff',
				'grey-600': '#5a5a5aff',
				'grey-700': '#474747ff',
				'grey-800': '#2a2a2aff',
				'grey-850': '#131313ff',
				'grey-900': '#070707ff'
			},
			animation: {
				text: 'text 5s ease infinite'
			},
			keyframes: {
				text: {
					'0%, 100%': {
						'background-size': '200% 200%',
						'background-position': 'left center'
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'right center'
					}
				}
			}
		}
	},
	daisyui: {
		themes: [
			{
				'hotlapmode-theme': {
					primary: '#dc2626',
					secondary: '#e5e7eb',
					accent: '#f4fc83',
					neutral: '#1B171C',
					'base-100': '#1c1917',
					info: '#41ABDC',
					success: '#4DE09B',
					warning: '#956C04',
					error: '#EA5772'
				}
			}
		]
	},
	plugins: [require('daisyui')]
};
