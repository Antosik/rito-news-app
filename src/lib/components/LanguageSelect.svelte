<script lang="ts">
  import { Locale } from '$lib/types/locale';
  import { t } from 'svelte-intl-precompile';

  import MultiSelect from 'svelte-multiselect';

  export let selected: string;

  const onChange = (e: CustomEvent) => {
    selected = e.detail.type === 'remove' ? undefined : e.detail.option;
  };

  const options = Object.values(Locale);
</script>

<MultiSelect
  maxSelect={1}
  selected={selected ? [selected] : []}
  noOptionsMsg={$t('multiselect.noOptionsMsg')}
  disabledTitle={$t('multiselect.disabledTitle')}
  defaultDisabledTitle={$t('multiselect.defaultDisabledTitle')}
  on:change={onChange}
  {options}
>
  <span let:option slot="option">
    {$t(`locales.${option}`)}
  </span>
  <span let:option slot="selected">
    {$t(`locales.${option}`)}
  </span>
  <span slot="remove-icon" />
</MultiSelect>

<style lang="scss">
  span {
    display: flex;
    align-items: center;
    gap: grid(1);
  }
</style>
