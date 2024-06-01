<script lang="ts">
  import AboutModal from '$lib/blocks/AboutModal.svelte';
  import Aside from '$lib/blocks/Aside.svelte';
  import Header from '$lib/blocks/Header.svelte';
  import LanguageModal from '$lib/blocks/LanguageModal.svelte';

  export let key: 'news' | 'jobs';

  let aboutModal: AboutModal;
  let languageModal: LanguageModal;
  let aside: Aside;

  function handleOpenAbout() {
    aboutModal.open();
  }
  function handleOpenLanguage() {
    languageModal.open();
  }
  function handleOpenFilter() {
    aside.open();
  }
</script>

<Header
  {key}
  on:open-about={handleOpenAbout}
  on:open-language={handleOpenLanguage}
  on:open-filter={handleOpenFilter}
/>

<main>
  <slot />
</main>

<AboutModal bind:this={aboutModal} />
<LanguageModal bind:this={languageModal} />

<Aside bind:this={aside} let:isOpened>
  <slot name="aside" {isOpened} />
</Aside>

<style lang="scss">
  main {
    position: relative;
    top: var(--header-size, 100px);
    height: calc(100% - var(--header-size, 100px));
    flex: 1 100%;

    @include breakpoint(lg) {
      flex: 1 65%;
    }
  }
</style>
