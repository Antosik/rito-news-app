<script lang="ts">
  import { Source } from '$lib/types/sources';
  import { t } from 'svelte-intl-precompile';

  import MultiSelect, { type Option } from 'svelte-multiselect';
  import SourceIcon from './SourceIcon.svelte';

  export let selected: Source[];

  const options = Object.values(Source);

  const typeConverter = (option: Option): Source => {
    if (typeof option === 'string' || typeof option === 'number') {
      return option as Source;
    }
    return option.value as Source;
  };
</script>

<MultiSelect bind:selected {options}>
  <span let:option slot="option">
    <SourceIcon source={typeConverter(option)} size={18} />
    {$t(`sources.${option}`)}
  </span>
  <span let:option slot="selected">
    <SourceIcon source={typeConverter(option)} size={18} />
    {$t(`sources.${option}`)}
  </span>
</MultiSelect>

<style>
  span {
    display: flex;
    align-items: center;
    gap: 4px;
  }
</style>
