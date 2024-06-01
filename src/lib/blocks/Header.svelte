<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { t } from 'svelte-intl-precompile';

  import FeatherIcon from '$lib/atoms/FeatherIcon.svelte';

  export let key: 'news' | 'jobs';

  const dispatch = createEventDispatcher<{
    'open-language': void;
    'open-about': void;
    'open-filter': void;
  }>();
</script>

<header>
  <h1>
    {#if key === 'news'}
      <FeatherIcon name="book-open" size="20" />
    {:else if key === 'jobs'}
      <FeatherIcon name="briefcase" size="20" />
    {/if}
    {$t(key)}
  </h1>

  <div class="tools">
    {#if key === 'news'}
      <a data-sveltekit-preload-data href="/jobs" title={$t('jobs')}>
        <FeatherIcon name="briefcase" size="18" />
      </a>
    {:else if key === 'jobs'}
      <a data-sveltekit-preload-data href="/" title={$t('news')}>
        <FeatherIcon name="book-open" size="18" />
      </a>
    {/if}

    <button
      aria-label={$t('change-language')}
      title={$t('change-language')}
      on:click={() => dispatch('open-language')}
    >
      <FeatherIcon name="globe" size="18" />
    </button>

    <button aria-label={$t('about')} title={$t('about')} on:click={() => dispatch('open-about')}>
      <FeatherIcon name="info" size="18" />
    </button>

    <button
      class="filter-button"
      aria-label={$t('filters')}
      title={$t('filters')}
      on:click={() => dispatch('open-filter')}
    >
      <FeatherIcon name="filter" size="18" />
    </button>
  </div>
</header>

<style lang="scss">
  header {
    @include flex_vcenter;

    position: fixed;
    z-index: 100000;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--header-size, 100px);
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 grid(8);
    background: $color-white;
    box-shadow:
      1px 2px 2px hsl(216deg 15% 87% / 33.3%),
      2px 4px 4px hsl(216deg 15% 87% / 33.3%),
      3px 6px 6px hsl(216deg 15% 87% / 33.3%);
  }

  h1 {
    @include flex_vcenter;

    gap: grid(2);
  }

  div {
    @include flex_center;

    gap: grid(2);
  }

  button,
  a {
    @include flex_center;

    padding: grid(1);
    border: 0;
    background: transparent;

    &.filter-button {
      @include breakpoint(lg) {
        display: none;
      }
    }
  }
</style>
