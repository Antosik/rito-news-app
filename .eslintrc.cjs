module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
	],
	plugins: ['svelte3', '@typescript-eslint'],
	ignorePatterns: ['*.cjs', 'svelte.config.js', 'vite.config.js'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	settings: {
		'svelte3/typescript': () => require('typescript'),
		'svelte3/ignore-styles': () => true,
		"import/resolver": {
			typescript: {} // this loads <rootdir>/tsconfig.json to eslint
		},
	},
	parserOptions: {
		project: './tsconfig.json',
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	rules: {
		'import/order': [
			'error',
			{
				pathGroups: [
					{
						pattern: '@sveltejs/**',
						group: 'builtin',
					},
					{
						pattern: '$app/**',
						group: 'external',
					},
					{
						pattern: '$lib/**',
						group: 'parent',
					},
				],
				'newlines-between': 'always',
				alphabetize: {
					order: 'asc',
				},
				groups: [
					'type',
					'builtin', // Built-in types are first
					'external',
					['parent', 'sibling', 'index'],
				],
			},
		],
	},
};
