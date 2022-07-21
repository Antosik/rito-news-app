<script context="module" lang="ts">
	import { getLocaleFromQueryString, init, waitLocale } from 'svelte-intl-precompile';
	import { registerAll } from '$locales';
	import { Locale } from '$lib/types/sources';

	registerAll();

	export async function load() {
		init({
			initialLocale: getLocaleFromQueryString('lang') ?? Locale.English_UnitedStates,
			fallbackLocale: Locale.English_UnitedStates
		});
		await waitLocale();
		return {};
	}
</script>

<slot />
