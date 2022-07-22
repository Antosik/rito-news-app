<script lang="ts">
	import { Locale } from '$lib/types/sources';
	import { t } from 'svelte-intl-precompile';

	import MultiSelect from 'svelte-multiselect';

	export let selected: Locale;

    const onChange = (e: CustomEvent) => {
        selected = e.detail.type === 'remove' ? undefined : e.detail.option;
    }

	const options = Object.values(Locale);
</script>

<MultiSelect maxSelect={1} selected={selected ? [selected] : []} on:change={onChange} {options}>
	<span let:option slot="option">
		{$t(`locales.${option}`)}
	</span>
	<span let:option slot="selected">
		{$t(`locales.${option}`)}
	</span>
    <span slot="remove-icon"></span>
</MultiSelect>

<style>
	span {
		display: flex;
		align-items: center;
		gap: 4px;
	}
</style>
