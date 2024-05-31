<script lang="ts">
  import type { JobsItem } from '$lib/types/jobs';

  import { fade } from 'svelte/transition';
  import { locale, t } from 'svelte-intl-precompile';

  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  import { loadData } from '$lib/api/news';
  import Job from '$lib/components/Job.svelte';
  import Loading from '$lib/components/Loading.svelte';
  import MultiSelectString from '$lib/components/MultiSelectString.svelte';
  import OfficesMap from '$lib/components/OfficesMap.svelte';
  import OfficesSelect from '$lib/components/OfficesSelect.svelte';
  import Page from '$lib/components/Page.svelte';
  import Search from '$lib/components/Search.svelte';
  import VirtualList from '$lib/components/VirtualList.svelte';

  const load = (locale: string) =>
    loadData<JobsItem>('riotgames', locale, 'jobs').then((res) => {
      availableProducts = Array.from(new Set(res.map((el) => el.products)));
      availableCrafts = Array.from(new Set(res.map((el) => el.craft.name)));
      return res;
    });

  $: loadPromise = load($locale);

  let availableCrafts: string[] = [];
  let availableProducts: string[] = [];
  let searchText: string;
  let selectedCrafts: string[] = [];
  let selectedProducts: string[] = [];
  let selectedOffices: number[] = [];

  $: if (browser) {
    const url = new URL($page.url);
    url.searchParams.set('locale', $locale);
    goto(url, { replaceState: true });
  }

  const filterJobs = (
    jobs: JobsItem[],
    searchText = '',
    offices: number[] = [],
    crafts: string[] = [],
    products: string[] = [],
  ) => {
    return jobs.filter(
      (el) =>
        (!searchText || el.title.toLowerCase().includes(searchText.toLowerCase())) &&
        (!offices.length || offices.includes(Number(el.office.id))) &&
        (!crafts.length || crafts.includes(el.craft.name)) &&
        (!products.length || products.includes(el.products)),
    );
  };

  const onRefresh = () => (loadPromise = load($locale));
</script>

<Page title={$t('jobs')}>
  {#await loadPromise}
    <div class="loading">
      <Loading --color="#000" --size="40px" --border="4px" --speed="1s" />
    </div>
  {:then data}
    <div class="list-wrapper">
      <VirtualList
        items={filterJobs(data, searchText, selectedOffices, selectedCrafts, selectedProducts)}
        let:item
        on:refresh={onRefresh}
      >
        <div class="item-wrapper" in:fade={{ duration: 200 }}>
          <Job {item} />
        </div>
      </VirtualList>
    </div>
  {:catch}
    <p>{$t('failed')}</p>
  {/await}

  <svelte:fragment slot="aside" let:isOpened>
    <ul class="tools">
      <li class="tool">
        <label for="search">{$t('search')}</label>
        <Search id="search" name="search" bind:value={searchText} />
      </li>
      <li class="tool">
        <label for="craft">{$t('craft')}</label>
        <MultiSelectString
          id="craft"
          name="craft"
          --sms-open-z-index={10000}
          bind:selected={selectedCrafts}
          options={availableCrafts}
        />
      </li>
      <li class="tool">
        <label for="product">{$t('product')}</label>
        <MultiSelectString
          id="product"
          name="product"
          --sms-open-z-index={10000}
          bind:selected={selectedProducts}
          options={availableProducts}
        />
      </li>
      <li class="tool">
        <label for="office">{$t('office')}</label>
        <div class="map">
          {#key isOpened}
            <OfficesMap bind:selected={selectedOffices} />
          {/key}
        </div>
        <OfficesSelect id="office" name="office" bind:selected={selectedOffices} />
      </li>
    </ul>
  </svelte:fragment>
</Page>

<style lang="scss">
  :root {
    --sms-focus-border: 1px solid #{$color-secondary};
  }

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

  :global(.tool .multiselect) {
    margin: grid(1) 0;
  }

  .loading {
    @include flex_center;

    padding: grid(8);
  }

  .map {
    height: 30vh;
    margin: grid(1) 0;
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
