<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { locale, t } from 'svelte-intl-precompile';

  import FeatherIcon from './FeatherIcon.svelte';
  import LanguageSelect from './LanguageSelect.svelte';
  import MediaQuery from './MediaQuery.svelte';

  export let title: string;

  let languageModal: HTMLDialogElement;
  let aboutModal: HTMLDialogElement;

  let filterModal: HTMLDialogElement;
  let isFilterOpened = false;

  const openLanguageModal = () => languageModal.showModal();
  const openAboutModal = () => aboutModal.showModal();
  const openFilterModal = () => {
    isFilterOpened = true;
    filterModal.showModal();
  };

  const handleDiaglogBackdropClick = (e: MouseEvent & { currentTarget: HTMLDialogElement }) => {
    if (e.target === e.currentTarget) {
      e.currentTarget.close();
    }
  };

  const handleFilterClose = () => {
    isFilterOpened = false;
  };
</script>

<header>
  <h1>{title}</h1>

  <div class="tools">
    <button aria-label={$t('change-language')} on:click={openLanguageModal}>
      <FeatherIcon name="globe" size="18" />
    </button>

    <button aria-label={$t('about')} on:click={openAboutModal}>
      <FeatherIcon name="info" size="18" />
    </button>

    <MediaQuery query="(min-width: 992px)" let:matches>
      {#if !matches}
        <button aria-label={$t('filters')} on:click={openFilterModal}>
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
  {:else}
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <dialog
      class="filter"
      bind:this={filterModal}
      transition:fade={{ duration: 200 }}
      on:mousedown={handleDiaglogBackdropClick}
      on:close={handleFilterClose}
    >
      <button type="button" on:click={() => filterModal.close()}>
        <FeatherIcon name="x" size="14" />
      </button>
      <aside transition:fly={{ x: 1000, opacity: 1 }}>
        <slot name="aside" isOpened={isFilterOpened} />
      </aside>
    </dialog>
  {/if}
</MediaQuery>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
  class="modal"
  bind:this={languageModal}
  transition:fade={{ duration: 200 }}
  on:mousedown={handleDiaglogBackdropClick}
>
  <button type="button" on:click={() => languageModal.close()}>
    <FeatherIcon name="x" size="14" />
  </button>
  <div class="language-select">
    <h2 class="visually-hidden">{$t('change-language')}</h2>
    <FeatherIcon name="globe" size="18" />
    <LanguageSelect --sms-open-z-index={10000} bind:selected={$locale} />
  </div>
</dialog>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
  class="modal"
  bind:this={aboutModal}
  transition:fade={{ duration: 200 }}
  on:mousedown={handleDiaglogBackdropClick}
>
  <button type="button" on:click={() => aboutModal.close()}>
    <FeatherIcon name="x" size="14" />
  </button>
  <div class="about">
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
    <p class="center"><a href="https://github.com/Antosik" target="_blank">Antosik</a>, 2024</p>
  </div>
</dialog>

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
  }

  main,
  aside {
    position: relative;
  }

  main {
    top: var(--header-size, 100px);
    height: calc(100% - var(--header-size, 100px));
    flex: 1 100%;

    @include breakpoint(lg) {
      flex: 1 65%;
    }
  }

  aside {
    overflow: auto;
    background: $color-white;

    @include breakpoint(lg) {
      top: var(--header-size, 100px);
      width: 35%;
      padding: grid(4) grid(8) grid(8);
    }
  }

  dialog {
    overflow: visible;
    padding: 0;
    border: 0;

    &::backdrop {
      background: color_adjust_alpha($color: $color-black, $amount: 0.7);
    }

    & > button {
      position: absolute;
      top: grid(1);
      right: grid(1);
    }
  }

  .modal {
    position: absolute;
    z-index: 20;
    top: 50%;
    left: 50%;
    width: max-content;
    max-width: 90%;
    padding: grid(4) grid(8);
    border-radius: 6px;
    background: $color-white;
    transform: translate(-50%, -50%);
  }

  .filter {
    position: absolute;
    z-index: 20;
    top: 0;
    left: 20vw;
    width: 80vw;
    height: 100vh;
    max-height: 100vh;
    padding: grid(8);
    background: $color-white;
    border-bottom-left-radius: 6px;
    border-top-left-radius: 6px;
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
