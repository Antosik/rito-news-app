import { sveltekit } from '@sveltejs/kit/vite';
import { isoImport } from 'vite-plugin-iso-import';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [isoImport(), sveltekit()],
	legacy: { buildSsrCjsExternalHeuristics: true },
};

export default config;
