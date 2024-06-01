<script lang="ts">
  import type { JobsItem } from '$lib/types/jobs';

  export let item: JobsItem;
</script>

<article class="article">
  <div class="article__content">
    <header>
      <h2>
        <a href={item.url} target="_blank">{item.title}</a>
      </h2>
    </header>

    <footer class="article__footer">
      {#if item.products}
        <span class="article__product">
          {item.products}
        </span>
      {/if}

      <ul class="article__tags">
        <li>
          {item.office.name}
        </li>
        <li>
          {item.craft.name}
        </li>
      </ul>
    </footer>
  </div>
</article>

<style lang="scss">
  .article {
    position: relative;
    display: flex;
    overflow: hidden;
    width: 100%;
    flex-direction: column;
    border: 2px solid $color-border;
    border-radius: 12px;
    transition: border 200ms ease-in-out;

    &__content {
      display: flex;
      flex: 1;
      flex-direction: column;
    }

    h2 {
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

    &__footer {
      display: flex;
      flex-direction: column;
      margin: auto grid(4) grid(3);
      color: $color-secondary;
      gap: grid(1);

      @include breakpoint(sm) {
        flex-direction: row;
        justify-content: space-between;
      }
    }

    &__tags {
      display: flex;
      flex-flow: row wrap;
      list-style: none;

      li:not(:last-child)::after {
        margin-right: grid(1);
        content: ';';
      }
    }

    &:hover {
      border: 2px solid $color-riotgames;
    }
  }
</style>
