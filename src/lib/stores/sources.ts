import { writable } from 'svelte/store';

import { Source } from '$lib/types/sources';

const getInitialValue = () => {
  if (typeof window === 'undefined') return Object.values(Source);

  const localStorageItems = localStorage
    .getItem('sources')
    ?.split(',')
    ?.filter(Boolean) as Source[];

  return localStorageItems ?? Object.values(Source);
};

export const selectedSources = writable<Source[]>(getInitialValue());

selectedSources.subscribe((value) => {
  if (typeof window === 'undefined') return null;
  localStorage.setItem('sources', value.join(','));
});
