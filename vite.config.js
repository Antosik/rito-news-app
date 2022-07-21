import { sveltekit } from '@sveltejs/kit/vite';
import { isoImport } from 'vite-plugin-iso-import';
import precompileIntl from "svelte-intl-precompile/sveltekit-plugin";

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [isoImport(), sveltekit(), precompileIntl('locales')],
	legacy: { buildSsrCjsExternalHeuristics: true },
};

export default config;
