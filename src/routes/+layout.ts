import { Locale } from '$lib/types/locale';

import { getLocaleFromQueryString, init, locale, waitLocale } from 'svelte-intl-precompile';

import { getLocaleFromLocalStorage, saveLocaleToLocalStorage } from '$lib/stores/locales';

import { registerAll } from '$locales';

export const ssr = false;
export const prerender = false;

registerAll();

export async function load() {
  init({
    initialLocale:
      getLocaleFromQueryString('locale') ??
      getLocaleFromLocalStorage() ??
      Locale.English_UnitedStates,
    fallbackLocale: Locale.English_UnitedStates,
  });

  saveLocaleToLocalStorage(locale);
  await waitLocale();

  return {};
}
