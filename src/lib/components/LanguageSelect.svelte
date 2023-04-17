<script lang="ts">
  import { Locale } from '$lib/types/locale';

  import { t } from 'svelte-intl-precompile';
  import MultiSelect, { type Option } from 'svelte-multiselect';

  export let selected: string;

  const onChange = (e: CustomEvent) => {
    selected = e.detail.type === 'add' ? e.detail.option : Locale.English_UnitedStates;
  };

  const filterFunc = (op: Option, searchText: string): boolean => {
    if (!searchText) return true;

    const value = typeof op === 'object' ? op.value?.toString() : op.toString();
    if (!value) {
      return false;
    }

    return $t(`locales.${value}`).toLowerCase().includes(searchText.toLowerCase());
  };

  const options: Option[] = Object.values(Locale);
</script>

<MultiSelect
  minSelect={1}
  maxSelect={1}
  selected={selected ? [selected] : [Locale.English_UnitedStates]}
  noMatchingOptionsMsg={$t('multiselect.noMatchingOptionsMsg')}
  defaultDisabledTitle={$t('multiselect.defaultDisabledTitle')}
  {filterFunc}
  on:change={onChange}
  {options}
  --sms-options-max-height="30vh"
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
  :root {
    --sms-focus-border: 1px solid #{$color-riotgames};
  }

  span {
    display: flex;
    align-items: center;
    gap: grid(1);
  }
</style>
