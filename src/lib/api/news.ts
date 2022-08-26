import { Locale, localeToRiotGamesLocaleMap } from '$lib/types/locale';
import type { Source } from '$lib/types/sources';

export async function loadData<T>(type: string, locale = 'en-us', mode = 'news'): Promise<T[]> {
  if (type.includes('riotgames')) {
    locale = localeToRiotGamesLocaleMap[locale as Locale] ?? locale;
  }
  return fetch(`https://rito-news.iamantosik.me/${type}/${locale}/${mode}.json`, {
    cache: 'no-cache'
  }).then((res) => res.json());
}

export async function loadDataBySource<T>(
  source: Source,
  locale = 'en-us'
): Promise<(T & { source: Source })[]> {
  const [type, mode] = source.split('_');
  return loadData(type, locale, mode);
}
