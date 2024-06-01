import { sveltekit } from '@sveltejs/kit/vite';
import precompileIntl from 'svelte-intl-precompile/sveltekit-plugin';
import { defineConfig } from 'vite';
import { isoImport } from 'vite-plugin-iso-import';

export default defineConfig({
  plugins: [isoImport(), sveltekit(), precompileIntl('locales')],
});
