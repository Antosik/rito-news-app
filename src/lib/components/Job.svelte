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
    display: flex;
    width: 100%;
    flex-direction: column;
    border-radius: 12px;
    border: 2px solid $color-border;
    overflow: hidden;
    position: relative;

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
      list-style: none;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      li:not(:last-child)::after {
        content: ';';
        margin-right: grid(1);
      }
    }
  }
</style>
