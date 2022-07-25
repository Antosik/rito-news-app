<script lang="ts">
  import { fly } from 'svelte/transition';
  import { locale } from 'svelte-intl-precompile';

  import FeatherIcon from './FeatherIcon.svelte';
  import LanguageSelect from './LanguageSelect.svelte';
  import MediaQuery from './MediaQuery.svelte';

  export let title: string;

  let showLanguageModal = false;
  const toggleLanguageModal = () => (showLanguageModal = !showLanguageModal);

  let menuOpened = false;
  const toggleMenu = () => (menuOpened = !menuOpened);
</script>

<header>
  <h1>{title}</h1>

  <div class="tools">
    <button class="language" class:active={showLanguageModal} on:click={toggleLanguageModal}>
      <FeatherIcon name="globe" size="18" />
    </button>

    <MediaQuery query="(min-width: 992px)" let:matches>
      {#if !matches}
        <button class="menu" class:active={menuOpened} on:click={toggleMenu}>
          <FeatherIcon name="menu" size="18" />
        </button>
      {/if}
    </MediaQuery>
  </div>
</header>

<main>
  <slot />
</main>

<MediaQuery query="(min-width: 992px)" let:matches>
  {#if matches}
    <aside>
      <slot name="aside" />
    </aside>
  {:else}
    <div
      class="overlay"
      style="--z-index-overlay: 1;"
      class:visible={menuOpened}
      on:click={toggleMenu}
    />
    {#if menuOpened}
      <aside transition:fly={{ x: 1000, opacity: 1 }}>
        <slot name="aside" />
      </aside>
    {/if}
  {/if}
</MediaQuery>

{#if showLanguageModal}
  <div
    class="overlay"
    style="--z-index-overlay: 11;"
    class:visible={showLanguageModal}
    on:click={toggleLanguageModal}
  />
  <div class="language-select">
    <FeatherIcon name="globe" size="18" />
    <LanguageSelect --sms-open-z-index={10000} bind:selected={$locale} />
  </div>
{/if}

<style lang="scss">
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1 0 100%;
    height: 100px;
    flex-wrap: wrap;
    padding: 0 grid(8);
    box-shadow: 1px 2px 2px hsla(216, 15%, 87%, 0.333), 2px 4px 4px hsl(216, 15%, 87%, 0.333),
      3px 6px 6px hsl(216, 15%, 87%, 0.333);
    background: $color-white;
    z-index: 100000;
  }

  .tools {
    @include flex_center;

    gap: grid(2);
  }

  button {
    @include flex_center;

    background: transparent;
    border: 0;
    padding: grid(1);

    &.active {
      color: $color-riotgames;
    }
  }

  main,
  aside {
    height: calc(100% - 100px);
  }

  main {
    flex: 1;
  }

  aside {
    display: flex;
    width: 85%;
    position: absolute;
    top: 100px;
    right: 0;
    overflow: auto;
    background: $color-white;
    z-index: 10;

    flex-direction: column;
    padding: grid(6) grid(8) grid(8);

    @include breakpoint(lg) {
      position: relative;
      width: 35%;
      top: initial;
      right: initial;
      height: calc(100% - 100px);
      padding-left: grid(4);
    }
  }

  .overlay.visible {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: transparentize($color: $color-black, $amount: 0.8);
    z-index: var(--z-index-overlay, 1);
  }

  .language-select {
    position: absolute;
    padding: grid(4) grid(8);
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    gap: grid(2);
    align-items: center;
    margin-top: auto;
    background: $color-white;
    z-index: 20;
    border-radius: 6px;
  }
</style>
