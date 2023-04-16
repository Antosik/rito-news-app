<script context="module" lang="ts">
  import { getLocaleFromQueryString, init, locale, waitLocale } from 'svelte-intl-precompile';

  import { registerAll } from '$locales';

  import { getLocaleFromLocalStorage, saveLocaleToLocalStorage } from '$lib/stores/locales';
  import { Locale } from '$lib/types/locale';

  registerAll();

  export async function load() {
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
</script>

<script lang="ts">
  import '../app.scss';
</script>

<slot />
