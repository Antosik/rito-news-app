module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	plugins: ['svelte3', '@typescript-eslint/eslint-plugin'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
	],
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	ignorePatterns: ['*.cjs', '.gitignore', 'svelte.config.js', 'vite.config.js'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	settings: {
    'svelte3/typescript': true,
    "svelte3/ignore-styles": ({ lang }) => !!lang,
		"import/resolver": {
			typescript: {} // this loads <rootdir>/tsconfig.json to eslint
		},
	},
	rules: {
		'import/order': [
			'error',
			{
				pathGroups: [
          {
            pattern: '$app/**',
            group: 'internal',
          },
          {
            pattern: '$lib/!(types)**/**',
            group: 'parent',
          },
          {
            pattern: '$lib/types',
            group: 'type',
          },
          {
            pattern: '$lib/types/**',
            group: 'type',
          }
				],
				'newlines-between': 'always',
				alphabetize: {
					order: 'asc',
				},
				groups: [
          'type',
          'builtin',
          'external',
          'internal',
          'parent',
          ['sibling', 'index'],
				],
			},
		],
    'import/no-unresolved': [2, { ignore: ['^\\$[env|app|locales]'] }]
	},
};
