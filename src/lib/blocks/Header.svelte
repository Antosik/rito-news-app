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
  <h1>{$t(key)}</h1>

  <div class="tools">
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

    <p class="center">
      <a data-sveltekit-preload-data href="/">{$t('news')}</a> |
      <a data-sveltekit-preload-data href="/jobs">{$t('jobs')}</a>
    </p>

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

  div {
    @include flex_center;

    gap: grid(2);
  }

  button {
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
