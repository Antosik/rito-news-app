<script lang="ts">
  import { Source } from '$lib/types/sources';

  import { t } from 'svelte-intl-precompile';

  import SourceIcon from '$lib/atoms/SourceIcon.svelte';

  export let selected: Source[] = [];

  const options = Object.values(Source);
  const toggleSelect = (option: Source) => {
    if (selected.includes(option)) {
      selected = selected.filter((el) => el != option);
    } else {
      selected = [...selected, option];
    }
  };
</script>

<ul>
  {#each options as option}
    {@const toggled = selected.length === 0 || selected.includes(option)}
    <li>
      <button
        aria-label={`${$t('select')} ${$t(`sources.${option}`)}`}
        type="button"
        aria-pressed={toggled}
        on:click={() => toggleSelect(option)}
      >
        <figure>
          <SourceIcon source={option} />
        </figure>
        <span>
          {$t(`sources.${option}`)}
        </span>
      </button>
    </li>
  {/each}
</ul>

<style lang="scss">
  ul {
    display: flex;
    flex-direction: column;
    gap: grid(2);
  }

  button {
    display: flex;
    width: 100%;
    align-items: center;
    padding: grid(2) grid(4);
    border: 2px solid $color-border;
    border-radius: 6px;
    background: transparent;
    font-size: 14px;
    gap: grid(4);
    transition: border 200ms ease-in-out;
    @include breakpoint(md) {
      font-size: 16px;
    }

    &[aria-pressed='true'] {
      border: 2px solid $color-riotgames;
    }
  }

  span {
    margin-bottom: grid(1);
  }

  figure {
    --source-icon-size: 24px;

    @include breakpoint(lg) {
      --source-icon-size: 32px;
    }
  }
</style>
