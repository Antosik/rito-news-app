<script lang="ts">
  import { t } from 'svelte-intl-precompile';
  import MultiSelect, { type ObjectOption } from 'svelte-multiselect';

  import offices from '$lib/api/offices.json';

  export let id: string;
  export let name: string;
  export let selected: number[] = [];

  const options: ObjectOption[] = offices.map((el) => ({ value: el.id, label: el.name }));

  const onChange = (e: CustomEvent) => {
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
  };

  $: selectedItems = options.filter((el) => selected.includes(el.value as number));
</script>

<MultiSelect
  {id}
  {name}
  selected={selectedItems}
  {options}
  noOptionsMsg={$t('multiselect.noOptionsMsg')}
  disabledTitle={$t('multiselect.disabledTitle')}
  defaultDisabledTitle={$t('multiselect.defaultDisabledTitle')}
  on:change={onChange}
/>
