<script lang="ts">
  import type { NewsItem } from '$lib/types/news';

  import { locale } from 'svelte-intl-precompile';

  import SourceIcon from '$lib/atoms/SourceIcon.svelte';

  export let item: NewsItem;

  $: image = item.image ? formatImage(item.image) : null;
  $: tags = [
    ...(item.categories ?? []),
    ...(item.tags ?? []),
    ...(item.category ? [item.category] : []),
  ];

  const dateFormat: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  function formatImage(imageUrl: string) {
    try {
      const url = new URL(imageUrl);
      if (url.hostname.includes('images.contentstack.io')) {
        url.searchParams.set('height', '200');
      }
      return url.toString();
    } catch {
      return imageUrl;
    }
  }
</script>

<article class="article">
  {#if image}
    <figure class="article__media">
      <img class="article__media-image" src={image} alt="" />
      <div class="article__media-blur" style:background-image={`url("${image}")`} />
    </figure>
  {/if}

  <div class="article__content">
    <header>
      <h2>
        {#if item.source}
          <SourceIcon source={item.source} className="article__source" />
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
              {tag}{#if i != tags.length - 1},&nbsp;{/if}
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
    position: relative;
    display: flex;
    overflow: hidden;
    width: 100%;
    flex-direction: column;
    border: 2px solid $color-border;
    border-radius: 12px;
    transition: border 200ms ease-in-out;

    @include breakpoint(md) {
      flex-direction: row;
    }

    &__media {
      position: relative;
      display: flex;
      overflow: hidden;
      width: var(--media-width);
      height: var(--media-height);
      flex-shrink: 0;

      @include breakpoint(md) {
        height: 100%;
      }

      &-blur {
        position: absolute;
        z-index: 1;
        filter: blur(var(--media-blur));
        inset: var(--media-blur-margin) var(--media-blur-margin) var(--media-blur-margin)
          var(--media-blur-margin);
        pointer-events: none;
      }

      &-image {
        position: relative;
        z-index: 2;
        display: block;
        max-width: var(--media-width);
        max-height: var(--media-height);
        margin: auto;
        object-fit: contain;
      }
    }

    &__content {
      display: flex;
      flex: 1;
      flex-direction: column;
    }

    h2 {
      --source-icon-size: 24px;

      margin: grid(3) grid(4);
    }

    a {
      color: $color-black;

      &::before {
        position: absolute;
        content: '';
        inset: 0;
      }
    }

    p {
      margin: 0 grid(4) grid(3);
    }

    &__footer {
      display: flex;
      flex-flow: column wrap;
      margin: auto grid(4) grid(3);
      color: $color-secondary;
      gap: grid(1);

      @include breakpoint(md) {
        flex-direction: row;
        justify-content: space-between;
      }
    }

    &__tags {
      display: flex;
      flex-wrap: wrap;
      list-style: none;

      @include breakpoint(md) {
        justify-content: flex-end;
      }
    }

    &:hover {
      border: 2px solid $color-riotgames;
    }
  }

  :global(.article__source) {
    margin-top: grid(1);
    margin-right: grid(2);
    float: left;
  }
</style>
