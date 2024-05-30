<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { locale, t } from 'svelte-intl-precompile';

  import FeatherIcon from './FeatherIcon.svelte';
  import LanguageSelect from './LanguageSelect.svelte';
  import MediaQuery from './MediaQuery.svelte';

  export let title: string;

  let showLanguageModal = false;
  const toggleLanguageModal = () => {
    showLanguageModal = !showLanguageModal;
    showAboutModal = false;
    menuOpened = false;
  };

  let showAboutModal = false;
  const toggleAboutModal = () => {
    showAboutModal = !showAboutModal;
    showLanguageModal = false;
    menuOpened = false;
  };

  let menuOpened = false;
  const toggleMenu = () => {
    menuOpened = !menuOpened;
    showLanguageModal = false;
    showAboutModal = false;
  };
</script>

<header>
  <h1>{title}</h1>

  <div class="tools">
    <button
      aria-label={$t('change-language')}
      class:active={showLanguageModal}
      on:click={toggleLanguageModal}
    >
      <FeatherIcon name="globe" size="18" />
    </button>

    <button aria-label={$t('about')} class:active={showAboutModal} on:click={toggleAboutModal}>
      <FeatherIcon name="info" size="18" />
    </button>

    <MediaQuery query="(min-width: 992px)" let:matches>
      {#if !matches}
        <button aria-label={$t('filters')} class:active={menuOpened} on:click={toggleMenu}>
          <FeatherIcon name="filter" size="18" />
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
  {:else if menuOpened}
    <div
      class="overlay"
      style:--z-index-overlay={2}
      transition:fade={{ duration: 200 }}
      on:click={toggleMenu}
      on:keydown={toggleMenu}
    />
    <aside transition:fly={{ x: 1000, opacity: 1 }}>
      <slot name="aside" />
    </aside>
  {/if}
</MediaQuery>

{#if showLanguageModal}
  <div
    class="overlay"
    style:--z-index-overlay={11}
    transition:fade={{ duration: 200 }}
    on:click={toggleLanguageModal}
  />
  <div
    role="alertdialog"
    aria-modal="true"
    class="modal language-select"
    transition:fade={{ duration: 200 }}
  >
    <h2 class="visually-hidden">{$t('change-language')}</h2>
    <FeatherIcon name="globe" size="18" />
    <LanguageSelect --sms-open-z-index={10000} bind:selected={$locale} />
  </div>
{/if}

{#if showAboutModal}
  <div
    class="overlay"
    style:--z-index-overlay={11}
    transition:fade={{ duration: 200 }}
    on:click={toggleAboutModal}
  />
  <div role="alertdialog" aria-modal="true" class="modal about" transition:fade={{ duration: 200 }}>
    <h2 class="center">{$t('about')}</h2>

    <p class="center">{$t('about-text')}</p>

    <hr />

    <p class="center">
      <a data-sveltekit-preload-data href="/">{$t('news')}</a> |
      <a data-sveltekit-preload-data href="/jobs">{$t('jobs')}</a>
    </p>

    <hr />

    <p class="center">
      <a href="https://github.com/Antosik/rito-news-app" target="_blank">{$t('source-code')}</a> |
      <a href="https://github.com/Antosik/rito-news-feeds" target="_blank">rito-news-feeds</a> |
      <a href="https://github.com/Antosik/rito-news" target="_blank">rito-news</a>
    </p>
    <p class="center" />
    <p class="center"><a href="https://iamantosik.me" target="_blank">Antosik</a>, 2023</p>
  </div>
{/if}

<style lang="scss">
  :root {
    --header-size: 75px;

    @include breakpoint(md) {
      --header-size: 100px;
    }
  }

  header {
    position: fixed;
    z-index: 100000;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: var(--header-size, 100px);
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 0 grid(8);
    background: $color-white;
    box-shadow:
      1px 2px 2px hsl(216deg 15% 87% / 33.3%),
      2px 4px 4px hsl(216deg 15% 87% / 33.3%),
      3px 6px 6px hsl(216deg 15% 87% / 33.3%);
  }

  .tools {
    @include flex_center;

    gap: grid(2);
  }

  button {
    @include flex_center;

    padding: grid(1);
    border: 0;
    background: transparent;

    &.active {
      color: $color-riotgames;
    }
  }

  main,
  aside {
    position: relative;
    top: var(--header-size, 100px);
    height: calc(100% - var(--header-size, 100px));
  }

  main {
    flex: 1 100%;

    @include breakpoint(lg) {
      flex: 1 65%;
    }
  }

  aside {
    position: absolute;
    z-index: 10;
    top: var(--header-size, 100px);
    right: 0;
    overflow: auto;
    width: 85%;
    padding: grid(6) grid(8) grid(8);
    background: $color-white;

    @include breakpoint(lg) {
      position: relative;
      top: var(--header-size, 100px);
      right: initial;
      width: 35%;
      padding-left: grid(4);
    }
  }

  .overlay {
    position: absolute;
    z-index: var(--z-index-overlay, 1);
    background: color_adjust_alpha($color: $color-black, $amount: 0.7);
    content: '';
    inset: 0;
  }

  .modal {
    position: absolute;
    z-index: 20;
    top: 50%;
    left: 50%;
    padding: grid(4) grid(8);
    border-radius: 6px;
    background: $color-white;
    transform: translate(-50%, -50%);
  }

  .language-select {
    display: flex;
    align-items: center;
    gap: grid(2);
  }

  .about {
    top: 50%;
    width: 90%;

    @include breakpoint(md) {
      width: auto;
    }

    h2 {
      margin-bottom: grid(3);
    }

    p {
      margin-bottom: grid(1);
    }

    hr {
      margin: grid(2) 0;
    }

    a {
      text-decoration: underline;
    }

    .center {
      text-align: center;
    }
  }
</style>
