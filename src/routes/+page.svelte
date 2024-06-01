<script lang="ts">
  import type { NewsItem } from '$lib/types/news';
  import { Source } from '$lib/types/sources';

  import { fade } from 'svelte/transition';
  import { t, locale } from 'svelte-intl-precompile';

  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  import { loadDataBySource } from '$lib/api/news';
  import Loading from '$lib/atoms/Loading.svelte';
  import Search from '$lib/atoms/Search.svelte';
  import Article from '$lib/components/Article.svelte';
  import SourceSelect from '$lib/components/SourceSelect.svelte';
  import VirtualList from '$lib/components/VirtualList.svelte';
  import { selectedSources } from '$lib/stores/sources';
  import Page from '$lib/widgets/Page.svelte';

  let searchText = '';

  $: if (browser) {
    const url = new URL($page.url);
    url.searchParams.set('locale', $locale);
    goto(url, { replaceState: true });
  }

  $: sourcesToLoad = $selectedSources?.length ? $selectedSources : Object.values(Source);

  const load = (sources: Source[], locale: string) =>
    Promise.all(
      sources.map(async (el) => {
        return loadDataBySource<NewsItem>(el, locale)
          .then((res) => res.map((item) => ({ ...item, source: el })))
          .catch(() => []);
      }),
    ).then((res) =>
      res
        .flat(1)
        .map((el) => ({ ...el, date: new Date(el.date) }))
        .sort((a, b) => b.date.getTime() - a.date.getTime()),
    );
  $: loadPromise = load(sourcesToLoad, $locale);

  const onRefresh = () => (loadPromise = load(sourcesToLoad, $locale));

  function filterDataBySearch(data: NewsItem[], searchText: string): NewsItem[] {
    const search = searchText.toLowerCase();
    return data.filter(
      (el) =>
        el.title?.toLowerCase().includes(search) ||
        el.description?.toLowerCase().includes(search) ||
        el.categories?.join(',').toLowerCase().includes(search) ||
        el.category?.toLowerCase().includes(search) ||
        el.tags?.join(',').toLowerCase().includes(search),
    );
  }
</script>

<Page key="news">
  {#await loadPromise}
    <div class="loading">
      <Loading --color="#000" --size="40px" --border="4px" --speed="1s" />
    </div>
  {:then data}
    <div class="list-wrapper">
      <VirtualList items={filterDataBySearch(data, searchText)} let:item on:refresh={onRefresh}>
        <div class="item-wrapper" in:fade={{ duration: 200 }}>
          <Article {item} />
        </div>
      </VirtualList>
    </div>
  {:catch}
    <p>{$t('failed')}</p>
  {/await}

  <svelte:fragment slot="aside">
    <ul class="tools">
      <li class="tool">
        <label for="search">{$t('search')}</label>
        <Search id="search" name="search" bind:value={searchText} />
      </li>
      <li class="tool">
        <label for="sources">{$t('select')}</label>
        <SourceSelect id="sources" name="sources" bind:selected={$selectedSources} />
      </li>
    </ul>
  </svelte:fragment>
</Page>

<style lang="scss">
  .list-wrapper {
    height: 100%;
  }

  :global(.list-wrapper > div) {
    padding-top: grid(6);
  }

  .tool {
    margin-top: grid(2);
    margin-bottom: grid(2);
  }

  .loading {
    @include flex_center;

    padding: grid(8);
  }

  .item-wrapper {
    display: flex;
    padding: 0 grid(4);
    margin-bottom: grid(3);
  }

  p {
    margin: grid(4);
    text-align: center;
  }
</style>
