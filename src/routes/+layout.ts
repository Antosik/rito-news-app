import { getLocaleFromQueryString, init, locale, waitLocale } from 'svelte-intl-precompile';

import { getLocaleFromLocalStorage, saveLocaleToLocalStorage } from '$lib/stores/locales';
import { Locale } from '$lib/types/locale';

import { registerAll } from '$locales';

export async function load() {
  registerAll();

  init({
    initialLocale:
      getLocaleFromQueryString('locale') ??
      getLocaleFromLocalStorage() ??
      Locale.English_UnitedStates,
    fallbackLocale: Locale.English_UnitedStates
  });

  saveLocaleToLocalStorage(locale);
  await waitLocale();

  return {};
}
