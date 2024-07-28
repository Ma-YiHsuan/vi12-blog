import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
	darkMode: 'selector',
	content: [
		'./components/**/*.{vue,js,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./App.{js,ts,vue}',
		'./app.{js,ts,vue}',
		'./Error.{js,ts,vue}',
		'./error.{js,ts,vue}',
		'./app.config.{js,ts}',
		'./content/**/**.md'
	],
	theme: {
		extend: {}
	},
	plugins: []
};
