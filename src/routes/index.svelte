<script lang="ts">
  import { fade } from 'svelte/transition';
  import { t, locale } from 'svelte-intl-precompile';

  import { browser } from '$app/env';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  import { loadDataBySource } from '$lib/api/news';
  import Article from '$lib/components/Article.svelte';
  import Page from '$lib/components/Page.svelte';
  import SourceSelect from '$lib/components/SourceSelect.svelte';
  import VirtualList from '$lib/components/VirtualList.svelte';
  import { selectedSources } from '$lib/stores/sources';
  import type { NewsItem } from '$lib/types/news';
  import { Source } from '$lib/types/sources';

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
</script>

<Page title={$t('news')}>
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

  <svelte:fragment slot="aside">
    <div class="tool">
      <SourceSelect bind:selected={$selectedSources} />
    </div>
  </svelte:fragment>
</Page>

<style lang="scss">
  ul {
    height: 100%;
  }

  .tool {
    margin-top: grid(2);
    margin-bottom: grid(2);
  }

  li {
    display: flex;
    margin-bottom: grid(3);
    padding: 0 grid(4);
  }

  p {
    margin: grid(4);
    text-align: center;
  }

  :global(svelte-virtual-list-viewport) {
    padding-top: grid(6);
  }
</style>
