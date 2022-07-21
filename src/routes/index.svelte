<script lang="ts">
	import VirtualList from '@sveltejs/svelte-virtual-list';
	import { Locale, Source } from '$lib/types/sources';
	import { fade } from 'svelte/transition';
	import Article from '$lib/components/article.svelte';

	function loadData<T>(game: string, locale: string, mode = 'news'): Promise<T[]> {
		return fetch(`https://rito-news.iamantosik.me/${game}/${locale}/${mode}.json`).then((res) =>
			res.json()
		);
	}

	let selectedOptions = Object.values(Source);
	let selectedLocale = Locale.Russian;

	$: loadPromise = Promise.all(
		selectedOptions.map((el) =>
			loadData(el, selectedLocale)
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
	<h1>Latest news</h1>
	<select bind:value={selectedLocale}>
		{#each Object.values(Locale) as locale}
			<option value={locale}>{locale}</option>
		{/each}
	</select>
	<select bind:value={selectedOptions} multiple>
		{#each Object.values(Source) as source}
			<option value={source}>{source}</option>
		{/each}
	</select>

	{#await loadPromise}
		loading...
	{:then data}
		<ul>
			<VirtualList items={data} let:item>
				<li in:fade={{ duration: 200 }}>
					<Article {item} />
				</li>
			</VirtualList>
		</ul>
	{:catch e}
		can't load {e}
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
