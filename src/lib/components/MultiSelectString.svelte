<script lang="ts">
  import { locale, t } from 'svelte-intl-precompile';

  import MultiSelect, { type Option } from 'svelte-multiselect';

  export let selected: string[] = [];
  export let options: string[] = [];

  const sortSelected = (a: Option, b: Option) => {
    return (a as string).localeCompare((b as string, $locale));
  };

  $: sortedOptions = options.sort((a, b) => a.localeCompare(b, $locale));
</script>

<MultiSelect
  bind:selected
  options={sortedOptions}
  {sortSelected}
  noOptionsMsg={$t('multiselect.noOptionsMsg')}
  disabledTitle={$t('multiselect.disabledTitle')}
  defaultDisabledTitle={$t('multiselect.defaultDisabledTitle')}
/>
