<script lang="ts">
	import SourceIcon from './SourceIcon.svelte';

	export let item: any;
</script>

<article class="article">
	{#if item.image}
		<figure class="article__media">
			<img src={item.image} alt="" />
			<div style:background-image={`url("${item.image}")`} />
		</figure>
	{/if}
	<div class="article__content">
		<header>
			<h2>
				<SourceIcon size={28} source={item.source} />
				<a href={item.url} target="_blank">{item.title}</a>
			</h2>
		</header>
		{#if item.description}
			<p>{item.description}</p>
		{/if}
		<footer>
			<time datetime={item.date.toISOString()}>{item.date.toLocaleString()}</time>
			{#if item.categories || item.tags}
				{@const tags = [...(item.categories ?? []), ...(item.tags ?? [])]}
				|
				<ul>
					{#each tags as tag, i}
						<li>
							{tag[0].toUpperCase() + tag.slice(1).toLowerCase()}{#if i != tags.length - 1},
							{/if}
						</li>
					{/each}
				</ul>
			{/if}
		</footer>
	</div>
</article>

<style>
	:root {
		--media-height: 150px;
		--media-width: calc(var(--media-height) / 9 * 16);
		--media-blur: 25px;
		--media-blur-margin: calc(-1 * var(--media-blur));
	}

	.article {
		display: flex;
		width: 100%;
		flex-direction: row;
		border-radius: 12px;
		border: 1px solid #ccc;
		overflow: hidden;
	}

	.article__media {
		position: relative;
		display: flex;
		flex-shrink: 0;
		overflow: hidden;
		width: var(--media-width);
		height: var(--media-height);
	}

	.article__media div {
		position: absolute;
		z-index: 1;
		top: var(--media-blur-margin);
		right: var(--media-blur-margin);
		bottom: var(--media-blur-margin);
		left: var(--media-blur-margin);
		filter: blur(var(--media-blur));
		pointer-events: none;
	}

	.article__media img {
		position: relative;
		z-index: 2;
		display: block;
		max-width: var(--media-width);
		max-height: var(--media-height);
		object-fit: contain;
		margin: auto;
	}

	.article__content {
		display: flex;
		flex-direction: column;
	}

	h2 {
		display: flex;
		gap: 8px;
		margin: 12px 16px;
	}

	.article__source-logo {
		width: 28px;
		height: 28px;
	}

	a {
		color: black;
	}

	p {
		margin: 0 16px 12px 16px;
	}

	footer {
		margin: auto 16px 12px;
		color: #6c6c6c;
		display: flex;
		gap: 4px;
	}

	footer > ul {
		list-style: none;
		display: flex;
	}
</style>
