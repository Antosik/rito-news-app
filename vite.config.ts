import { sveltekit } from '@sveltejs/kit/vite';
import { isoImport } from 'vite-plugin-iso-import';
import precompileIntl from "svelte-intl-precompile/sveltekit-plugin";
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [isoImport(), sveltekit(), precompileIntl('locales')],
});
