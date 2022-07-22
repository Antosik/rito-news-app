/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  // interface Locals {}
  // interface Platform {}
  // interface Session {}
  // interface Stuff {}
}

// https://github.com/cibernox/svelte-intl-precompile fallback
declare module '$locales' {
  /** Registers all locales found in `localesRoot`. */
  export const registerAll: () => void;

  /** A list of all locales that will be registered by {@link registerAll()}. */
  export const availableLocales: string[];
}

// https://github.com/bluwy/vite-plugin-iso-import
// default export
declare module 'svelte-leafletjs?client' {
  export * from 'svelte-leafletjs';
  export class DivIcon extends (await import('svelte')).SvelteComponentTyped<{
    options: L.DivIconOptions;
  }> {
    getIcon(): L.Icon;
  }
}

// fallback
declare module '*?client';
declare module '*?server';
