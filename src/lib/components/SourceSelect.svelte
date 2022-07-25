<script lang="ts">
  import { t } from 'svelte-intl-precompile';

  import MediaQuery from '$lib/components/MediaQuery.svelte';
  import SourceIcon from '$lib/components/SourceIcon.svelte';
  import { Source } from '$lib/types/sources';

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
      <button type="button" aria-pressed={toggled} on:click={() => toggleSelect(option)}>
        <figure>
          <MediaQuery query="(min-width: 992px)" let:matches>
            <SourceIcon source={option} size={matches ? 32 : 24} />
          </MediaQuery>
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
    align-items: center;
    gap: grid(4);
    width: 100%;
    border: 2px solid #ccc;
    transition: border 200ms ease-in-out;
    padding: grid(2) grid(4);
    border-radius: 6px;
    background: transparent;

    font-size: 14px;
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
</style>
