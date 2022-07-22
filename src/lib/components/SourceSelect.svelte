<script lang="ts">
	import { Source } from '$lib/types/sources';
	import { t } from 'svelte-intl-precompile';

	import MultiSelect from 'svelte-multiselect';
	import SourceIcon from './SourceIcon.svelte';

	export let selected: Source[];

	const options = Object.values(Source);
</script>

<MultiSelect bind:selected {options}>
	<span let:option slot="option">
		<SourceIcon source={option} size={18} />
		{$t(`sources.${option}`)}
	</span>
	<span let:option slot="selected">
		<SourceIcon source={option} size={18} />
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
