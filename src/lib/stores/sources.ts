import type { Source } from '$lib/types/sources';

import { writable } from 'svelte/store';

const getInitialValue = () => {
  if (typeof window === 'undefined') return [];

  const localStorageItems = localStorage
    .getItem('sources')
    ?.split(',')
    ?.filter(Boolean) as Source[];

  return localStorageItems ?? [];
};

export const selectedSources = writable<Source[]>(getInitialValue());

selectedSources.subscribe((value) => {
  if (typeof window === 'undefined') return null;
  localStorage.setItem('sources', value.join(','));
});
