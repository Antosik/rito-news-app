<script lang="ts">
  import { t } from 'svelte-intl-precompile';
  import MultiSelect from 'svelte-multiselect';

  import { Locale } from '$lib/types/locale';

  export let selected: string;

  const onChange = (e: CustomEvent) => {
    selected = e.detail.type === 'add' ? e.detail.option : undefined;
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
