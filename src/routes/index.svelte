<script lang="ts">
  import { t, locale } from 'svelte-intl-precompile';
  import VirtualList from '$lib/components/VirtualList.svelte';
  import { Source } from '$lib/types/sources';
  import { quadIn, quadOut } from 'svelte/easing';
  import { fade, fly, type FlyParams } from 'svelte/transition';
  import Article from '$lib/components/Article.svelte';
  import SourceSelect from '$lib/components/SourceSelect.svelte';
  import LanguageSelect from '$lib/components/LanguageSelect.svelte';
  import FeatherIcon from '$lib/components/FeatherIcon.svelte';
  import { loadDataBySource } from '$lib/api/news';
  import type { NewsItem } from '$lib/types/news';

  let selectedOptions = Object.values(Source);

  const toggleAnimation: FlyParams = { y: -48, opacity: 0, duration: 200 };
  let showLanguageSelect = false;
  let showSourcesSelect = false;

  $: loadPromise = Promise.all(
    selectedOptions.map((el) => {
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
  <header>
    <h1>{$t('news')}</h1>
    <div class="tools">
      <button
        class="tools__toggle"
        class:tools__toggle--active={showSourcesSelect}
        on:click={toggleSourcesSelect}
      >
        <FeatherIcon name="filter" size="18" />
      </button>
      <button
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
        <SourceSelect bind:selected={selectedOptions} />
      </div>
    {/if}
  </header>

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

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: grid(8);
    box-shadow: 1px 2px 2px hsla(216, 15%, 87%, 0.333), 2px 4px 4px hsl(216, 15%, 87%, 0.333),
      3px 6px 6px hsl(216, 15%, 87%, 0.333);
    z-index: 3;
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
    min-height: 200px;
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
  }
</style>
