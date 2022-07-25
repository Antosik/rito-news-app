<script lang="ts">
  import { locale } from 'svelte-intl-precompile';

  import SourceIcon from '$lib/components/SourceIcon.svelte';
  import type { NewsItem } from '$lib/types/news';

  export let item: NewsItem;

  $: tags = [
    ...(item.categories ?? []),
    ...(item.tags ?? []),
    ...(item.category ? [item.category] : [])
  ];

  const dateFormat: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
</script>

<article class="article">
  {#if item.image}
    <figure class="article__media">
      <img class="article__media-image" src={item.image} alt="" />
      <div class="article__media-blur" style:background-image={`url("${item.image}")`} />
    </figure>
  {/if}

  <div class="article__content">
    <header>
      <h2>
        {#if item.source}
          <SourceIcon size={24} source={item.source} className="article__source" />
        {/if}
        <a href={item.url} target="_blank">{item.title}</a>
      </h2>
    </header>

    {#if item.description}
      <p>{item.description}</p>
    {/if}

    <footer class="article__footer">
      <time datetime={item.date.toISOString()}>
        {item.date.toLocaleString($locale, dateFormat)}
      </time>

      {#if tags.length > 0}
        <ul class="article__tags">
          {#each tags as tag, i}
            <li>
              {tag[0].toUpperCase() +
                tag.slice(1).toLowerCase()}{#if i != tags.length - 1},&nbsp;{/if}
            </li>
          {/each}
        </ul>
      {/if}
    </footer>
  </div>
</article>

<style lang="scss">
  :root {
    --media-height: 150px;
    --media-width: 100%;
    --media-blur: 25px;
    --media-blur-margin: calc(-1 * var(--media-blur));

    @include breakpoint(md) {
      --media-height: 150px;
      --media-width: calc(var(--media-height) / 9 * 16);
    }
  }

  .article {
    display: flex;
    width: 100%;
    flex-direction: column;
    border-radius: 12px;
    border: 2px solid #ccc;
    overflow: hidden;
    position: relative;

    @include breakpoint(md) {
      flex-direction: row;
    }

    &__media {
      position: relative;
      display: flex;
      flex-shrink: 0;
      overflow: hidden;
      width: var(--media-width);
      height: var(--media-height);

      @include breakpoint(md) {
        height: 100%;
      }

      &-blur {
        position: absolute;
        z-index: 1;
        top: var(--media-blur-margin);
        right: var(--media-blur-margin);
        bottom: var(--media-blur-margin);
        left: var(--media-blur-margin);
        filter: blur(var(--media-blur));
        pointer-events: none;
      }

      &-image {
        position: relative;
        z-index: 2;
        display: block;
        max-width: var(--media-width);
        max-height: var(--media-height);
        object-fit: contain;
        margin: auto;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    h2 {
      margin: grid(3) grid(4);
    }

    a {
      color: $color-black;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
    }

    p {
      margin: 0 grid(4) grid(3) grid(4);
    }

    &__footer {
      display: flex;
      flex-direction: column;
      margin: auto grid(4) grid(3);
      color: #6c6c6c;
      gap: grid(1);

      @include breakpoint(md) {
        flex-direction: row;
        justify-content: space-between;
      }
    }

    &__tags {
      list-style: none;
      display: flex;
    }
  }

  :global(.article__source) {
    float: left;
    margin-top: grid(1);
    margin-right: grid(2);
  }
</style>
