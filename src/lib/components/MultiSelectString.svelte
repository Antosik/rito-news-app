<script lang="ts">
  import { locale, t } from 'svelte-intl-precompile';
  import MultiSelect, { type Option } from 'svelte-multiselect';

  export let id: string;
  export let name: string;
  export let selected: string[] = [];
  export let options: string[] = [];

  const sortSelected = (a: Option, b: Option) => {
    return (a as string).localeCompare((b as string, $locale));
  };

  $: sortedOptions = options.sort((a, b) => a.localeCompare(b, $locale));
</script>

<MultiSelect
  bind:selected
  {id}
  {name}
  options={sortedOptions}
  {sortSelected}
  noMatchingOptionsMsg={$t('multiselect.noMatchingOptionsMsg')}
  defaultDisabledTitle={$t('multiselect.defaultDisabledTitle')}
  --sms-options-max-height="30vh"
/>

<style lang="scss">
  :root {
    --sms-focus-border: 1px solid #{$color-riotgames};
  }
</style>
