<script lang="ts">
  import { quadIn, quadOut } from 'svelte/easing';
  import { fade, fly, type FlyParams } from 'svelte/transition';
  import { t, locale } from 'svelte-intl-precompile';

  import { browser } from '$app/env';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  import { loadDataBySource } from '$lib/api/news';
  import Article from '$lib/components/Article.svelte';
  import FeatherIcon from '$lib/components/FeatherIcon.svelte';
  import Header from '$lib/components/Header.svelte';
  import LanguageSelect from '$lib/components/LanguageSelect.svelte';
  import SourceSelect from '$lib/components/SourceSelect.svelte';
  import VirtualList from '$lib/components/VirtualList.svelte';
  import { selectedSources } from '$lib/stores/sources';
  import type { NewsItem } from '$lib/types/news';
  import { Source } from '$lib/types/sources';

  const toggleAnimation: FlyParams = { y: -48, opacity: 0, duration: 200 };
  let showLanguageSelect = false;
  let showSourcesSelect = false;

  $: if (browser) {
    const url = new URL($page.url);
    url.searchParams.set('locale', $locale);
    goto(url, { replaceState: true });
  }

  $: sourcesToLoad = $selectedSources?.length ? $selectedSources : Object.values(Source);
  $: loadPromise = Promise.all(
    sourcesToLoad.map(async (el) => {
      return loadDataBySource<NewsItem>(el, $locale)
        .then((res) => res.map((item) => ({ ...item, source: el })))
        .catch(() => []);
    })
  ).then((res) =>
    res
      .flat(1)
      .map((el) => ({ ...el, date: new Date(el.date) }))
      .sort((a, b) => b.date.getTime() - a.date.getTime())
  );

  const toggleLanguageSelect = () => {
    showLanguageSelect = !showLanguageSelect;
    showSourcesSelect = false;
  };
  const toggleSourcesSelect = () => {
    showSourcesSelect = !showSourcesSelect;
    showLanguageSelect = false;
  };
</script>

<section>
  <Header>
    <h1 slot="title">{$t('news')}</h1>
    <div class="tools">
      <button
        type="button"
        class="tools__toggle"
        class:tools__toggle--active={showSourcesSelect}
        on:click={toggleSourcesSelect}
      >
        <FeatherIcon name="filter" size="18" />
      </button>
      <button
        type="button"
        class="tools__toggle"
        class:tools__toggle--active={showLanguageSelect}
        on:click={toggleLanguageSelect}
      >
        <FeatherIcon name="globe" size="18" />
      </button>
    </div>

    {#if showLanguageSelect}
      <div
        class="tool"
        in:fly={{ ...toggleAnimation, easing: quadIn }}
        out:fly={{ ...toggleAnimation, easing: quadOut }}
      >
        <LanguageSelect bind:selected={$locale} />
      </div>
    {/if}
    {#if showSourcesSelect}
      <div
        class="tool"
        in:fly={{ ...toggleAnimation, easing: quadIn }}
        out:fly={{ ...toggleAnimation, easing: quadOut }}
      >
        <SourceSelect bind:selected={$selectedSources} />
      </div>
    {/if}
  </Header>

  {#await loadPromise}
    <p>{$t('loading')}</p>
  {:then data}
    <ul>
      <VirtualList items={data} let:item>
        <li in:fade={{ duration: 200 }}>
          <Article {item} />
        </li>
      </VirtualList>
    </ul>
  {:catch}
    <p>{$t('failed')}</p>
  {/await}
</section>

<style lang="scss">
  section {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .tools {
    display: flex;
    gap: grid(1);
    align-items: center;

    &__toggle {
      @include flex_center;

      background: transparent;
      border: 0;
      padding: grid(1);

      &--active {
        color: red;
      }
    }
  }

  .tool {
    flex: 1 0 100%;
    margin-top: grid(4);
  }

  section > ul {
    height: calc(100% - 100px);
  }

  li {
    display: flex;
    margin-bottom: grid(3);
    padding: 0 grid(8);
  }

  p {
    margin: grid(4);
    text-align: center;
  }

  :global(svelte-virtual-list-viewport) {
    padding-top: grid(6);
    padding-bottom: grid(3);
  }
</style>
