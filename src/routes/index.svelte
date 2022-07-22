<script lang="ts">
	import { t, locale } from 'svelte-intl-precompile';
	import VirtualList from '@sveltejs/svelte-virtual-list';
	import { Locale, Source } from '$lib/types/sources';
	import { fade } from 'svelte/transition';
	import Article from '$lib/components/Article.svelte';
	import SourceSelect from '$lib/components/SourceSelect.svelte';
	import LanguageSelect from '$lib/components/LanguageSelect.svelte';

	function loadData<T>(game: string, locale: string, mode = 'news'): Promise<T[]> {
		return fetch(`https://rito-news.iamantosik.me/${game}/${locale}/${mode}.json`).then((res) =>
			res.json()
		);
	}

	let selectedOptions = Object.values(Source);

	$: localeLocale = $locale as Locale

	$: loadPromise = Promise.all(
		selectedOptions.map((el) =>
			loadData(el, $locale)
				.then((res) => res.map((item) => ({ ...item, source: el })))
				.catch(() => [])
		)
	).then((res) =>
		res
			.flat()
			.map((el) => ({ ...el, date: new Date(el.date) }))
			.sort((a, b) => b.date - a.date)
	);
</script>

<section>
	<h1>{$t('news')}</h1>
	<LanguageSelect bind:selected={localeLocale} />
	<SourceSelect bind:selected={selectedOptions} />

	{#await loadPromise}
		{$t('loading')}
	{:then data}
		<ul>
			<VirtualList items={data} let:item>
				<li in:fade={{ duration: 200 }}>
					<Article {item} />
				</li>
			</VirtualList>
		</ul>
	{:catch e}
		{$t('failed')}
	{/await}
</section>

<style>
	section {
		padding: 40px;
	}

	section > ul {
		min-height: 200px;
		height: calc(100vh - 15em);
		list-style: none;
		margin: 20px 0;
	}

	li {
		display: flex;
		margin-bottom: 12px;
	}
</style>
