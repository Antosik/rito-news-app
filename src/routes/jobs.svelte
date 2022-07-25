<script lang="ts">
  import { fade } from 'svelte/transition';
  import { locale, t } from 'svelte-intl-precompile';

  import { browser } from '$app/env';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  import { loadData } from '$lib/api/news';
  import Job from '$lib/components/Job.svelte';
  import MultiSelectString from '$lib/components/MultiSelectString.svelte';
  import OfficesMap from '$lib/components/OfficesMap.svelte';
  import OfficesSelect from '$lib/components/OfficesSelect.svelte';
  import Page from '$lib/components/Page.svelte';
  import VirtualList from '$lib/components/VirtualList.svelte';
  import type { JobsItem } from '$lib/types/jobs';

  $: loadPromise = loadData<JobsItem>('riotgames', $locale, 'jobs').then((res) => {
    availableProducts = Array.from(new Set(res.map((el) => el.products)));
    availableCrafts = Array.from(new Set(res.map((el) => el.craft.name)));
    return res;
  });

  let availableCrafts: string[] = [];
  let availableProducts: string[] = [];
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
    offices: number[] = [],
    crafts: string[] = [],
    products: string[] = []
  ) => {
    return jobs.filter(
      (el) =>
        (!offices.length || offices.includes(Number(el.office.id))) &&
        (!crafts.length || crafts.includes(el.craft.name)) &&
        (!products.length || products.includes(el.products))
    );
  };
</script>

<Page title={$t('jobs')}>
  {#await loadPromise}
    <p>{$t('loading')}</p>
  {:then data}
    <ul>
      <VirtualList
        items={filterJobs(data, selectedOffices, selectedCrafts, selectedProducts)}
        let:item
      >
        <li in:fade={{ duration: 200 }}>
          <Job {item} />
        </li>
      </VirtualList>
    </ul>
  {:catch}
    <p>{$t('failed')}</p>
  {/await}

  <svelte:fragment slot="aside">
    <div class="tool">
      <label for="craft">{$t('craft')}</label>
      <MultiSelectString
        id="craft"
        name="craft"
        --sms-open-z-index={10000}
        bind:selected={selectedCrafts}
        options={availableCrafts}
      />
    </div>
    <div class="tool">
      <label for="product">{$t('product')}</label>
      <MultiSelectString
        id="product"
        name="product"
        --sms-open-z-index={10000}
        bind:selected={selectedProducts}
        options={availableProducts}
      />
    </div>
    <div class="tool">
      <label for="office">{$t('office')}</label>
      <div class="map">
        <OfficesMap bind:selected={selectedOffices} />
      </div>
      <OfficesSelect id="office" name="office" bind:selected={selectedOffices} />
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

  .map {
    height: 30vh;
    margin: grid(1) 0;
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

  :global(.tool .multiselect) {
    margin: grid(1) 0;
  }

  :global(svelte-virtual-list-viewport) {
    padding-top: grid(6);
  }
</style>
