import type { Writable } from 'svelte/store';

export const saveLocaleToLocalStorage = (locale: Writable<string>) => {
  locale.subscribe((value) => {
    if (typeof window === 'undefined') return null;
    localStorage.setItem('locale', value);
  });
};

export const getLocaleFromLocalStorage = () => {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem('locale');
};
