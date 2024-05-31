import { Locale, LOCALE_TO_RIOTGAMES_LOCALE_MAP, RiotGamesLocale } from '$lib/types/locale';
import { Service, type Source } from '$lib/types/sources';

/**
 * Validates that specified locale is available
 */
function isValidLocale(locale: string): locale is Locale {
  return Object.values(Locale).includes(locale);
}

/**
 * Returns locale that compatible with specified service
 */
function getServiceCompatibleLocale(service: Service, locale: string): RiotGamesLocale | Locale {
  const parsedLocale = isValidLocale(locale) ? locale : Locale.English_UnitedStates;

  if (service === Service.RIOTGAMES) {
    return LOCALE_TO_RIOTGAMES_LOCALE_MAP[parsedLocale] ?? RiotGamesLocale.English;
  }

  return locale;
}

/**
 * Loads data from rito-news Data API for specified service and mode
 * @template T Response type
 * @param service Code of the service
 * @param locale Locale
 * @param mode Mode that depends on service (news, esports, status, etc.)
 * @returns Array of data
 */
export async function loadData<T>(service: Service, locale: string, mode: string): Promise<T[]> {
  const serviceLocale = getServiceCompatibleLocale(service, locale);

  return fetch(`https://data.rito.news/${service}/${serviceLocale}/${mode}.json`, {
    cache: 'no-cache',
  }).then((res) => res.json() as Promise<T[]>);
}

/**
 * Loads data from rito-news Data API for specified source
 * @template T Response type
 * @param service Code of the service
 * @param locale Locale
 * @param mode Mode that depends on service (news, esports, status, etc.)
 * @returns Array of data
 */
export async function loadDataBySource<T>(source: Source, locale = 'en-us'): Promise<T[]> {
  const [type, mode = 'news'] = source.split('_');
  return loadData(type as Service, locale, mode);
}
