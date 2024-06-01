<script lang="ts">
  import { Source } from '$lib/types/sources';

  import { t } from 'svelte-intl-precompile';
  import { MultiSelect, type ObjectOption } from 'svelte-multiselect';

  import SourceIcon from '$lib/atoms/SourceIcon.svelte';

  export let id: string;
  export let name: string;
  export let selected: Source[] = [];

  let options: ObjectOption[] = [];
  $: options = Object.values(Source).map((option) => ({
    value: option,
    label: $t(`sources.${option}`),
  }));
  $: selectedItems = options.filter((el) => selected.includes(getSourceFromOption(el)));

  function onChange(e: CustomEvent) {
    switch (e.detail.type) {
      case 'add':
        selected = [...selected, e.detail.option.value];
        return;
      case 'remove':
        selected = selected.filter((el) => el !== e.detail.option.value);
        return;
      case 'removeAll':
        selected = [];
        return;
    }
  }

  function getSourceFromOption(option: ObjectOption) {
    return option.value as Source;
  }
</script>

<MultiSelect
  {id}
  {name}
  selected={selectedItems}
  {options}
  noMatchingOptionsMsg={$t('multiselect.noMatchingOptionsMsg')}
  defaultDisabledTitle={$t('multiselect.defaultDisabledTitle')}
  on:change={onChange}
  --sms-options-max-height="20vh"
  let:option
>
  <div>
    <figure>
      <SourceIcon source={getSourceFromOption(option)} />
    </figure>
    <span>{option.label}</span>
  </div>
</MultiSelect>

<style lang="scss">
  :root {
    --sms-focus-border: 1px solid #{$color-secondary};
  }

  div {
    @include flex_vcenter;

    gap: grid(2);
  }
</style>
