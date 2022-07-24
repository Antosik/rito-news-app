<script lang="ts">
  import { fade, fly, type FlyParams } from 'svelte/transition';
  import { quadIn, quadOut } from 'svelte/easing';
  import { locale, t } from 'svelte-intl-precompile';

  import { browser } from '$app/env';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  import { loadData } from '$lib/api/news';
  import FeatherIcon from '$lib/components/FeatherIcon.svelte';
  import Header from '$lib/components/Header.svelte';
  import Job from '$lib/components/Job.svelte';
  import LanguageSelect from '$lib/components/LanguageSelect.svelte';
  import MultiSelectString from '$lib/components/MultiSelectString.svelte';
  import OfficesMap from '$lib/components/OfficesMap.svelte';
  import OfficesSelect from '$lib/components/OfficesSelect.svelte';
  import VirtualList from '$lib/components/VirtualList.svelte';
  import type { JobsItem } from '$lib/types/jobs';

  $: loadPromise = loadData<JobsItem>('riotgames', $locale, 'jobs').then((res) => {
    availableProducts = Array.from(new Set(res.map((el) => el.products)));
    availableCrafts = Array.from(new Set(res.map((el) => el.craft.name)));
    return res;
  });

  const toggleAnimation: FlyParams = { y: -48, opacity: 0, duration: 200 };
  let showLanguageSelect = false;
  let showFilters = false;
  let showMap = false;

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

  const toggleLanguageSelect = () => {
    showLanguageSelect = !showLanguageSelect;
    showFilters = false;
    showMap = false;
  };
  const toggleFilters = () => {
    showFilters = !showFilters;
    showLanguageSelect = false;
    showMap = false;
  };
  const toggleMap = () => {
    showMap = !showMap;
    showFilters = false;
    showLanguageSelect = false;
  };

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

<section>
  <Header>
    <h1 slot="title">{$t('jobs')}</h1>
    <div class="tools">
      <button
        type="button"
        class="tools__toggle"
        class:tools__toggle--active={showFilters}
        on:click={toggleFilters}
      >
        <FeatherIcon name="filter" size="18" />
      </button>
      <button
        type="button"
        class="tools__toggle"
        class:tools__toggle--active={showMap}
        on:click={toggleMap}
      >
        <FeatherIcon name="map" size="18" />
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
    {#if showFilters}
      <div
        class="tool"
        in:fly={{ ...toggleAnimation, easing: quadIn }}
        out:fly={{ ...toggleAnimation, easing: quadOut }}
      >
        <div class="tool__item">
          <span>{$t('craft')}</span>
          <MultiSelectString bind:selected={selectedCrafts} options={availableCrafts} />
        </div>
        <div class="tool__item">
          <span>{$t('product')}</span>
          <MultiSelectString bind:selected={selectedProducts} options={availableProducts} />
        </div>
      </div>
    {/if}
    {#if showMap}
      <div
        class="tool"
        in:fly={{ ...toggleAnimation, easing: quadIn }}
        out:fly={{ ...toggleAnimation, easing: quadOut }}
      >
        <div class="map">
          <OfficesMap bind:selected={selectedOffices} />
        </div>
        <OfficesSelect bind:selected={selectedOffices} />
      </div>
    {/if}
  </Header>

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
</section>

<style lang="scss">
  section {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  section > ul {
    height: calc(100% - 100px);
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
        color: $color-riotgames;
      }
    }
  }

  .tool {
    flex: 1 0 100%;
    margin-top: grid(4);

    &__item {
      margin-bottom: grid(4);
    }
  }

  .map {
    height: 50vh;
    margin-top: grid(8);

    @include breakpoint(md) {
      height: 30vh;
    }
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

  :global(.tool__item .multiselect) {
    margin: grid(1) 0;
  }
</style>
