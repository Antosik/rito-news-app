<script lang="ts" generics="T">
  // @sveltejs/svelte-virtual-list
  import { onMount, tick } from 'svelte';

  import FeatherIcon from '../atoms/FeatherIcon.svelte';

  import PullToRefresh from './PullToRefresh.svelte';

  // props
  export let items: T[];
  export let height = '100%';
  export let itemHeight: number | undefined = undefined;

  // read-only, but visible to consumers via bind:start
  export let start = 0;
  export let end = 0;

  // local state
  let height_map: number[] = [];
  let rows: HTMLCollectionOf<HTMLElement>;
  let viewport: HTMLElement;
  let contents: HTMLElement;
  let viewport_height = 0;
  let visible: { index: number; data: T }[];
  let mounted: boolean;

  let top = 0;
  let bottom = 0;
  let average_height: number;

  $: visible = items.slice(start, end).map((data, i) => {
    return { index: i + start, data };
  });

  // whenever `items` changes, invalidate the current heightmap
  $: if (mounted) refresh(items, viewport_height, itemHeight);

  async function refresh(items: T[], viewport_height: number, itemHeight: number | undefined) {
    const { scrollTop } = viewport;

    await tick(); // wait until the DOM is up to date

    let content_height = top - scrollTop;
    let i = start;

    while (content_height < viewport_height && i < items.length) {
      let row = rows[i - start];

      if (!row) {
        end = i + 1;
        await tick(); // render the newly visible row
        row = rows[i - start];
      }

      const row_height = (height_map[i] = itemHeight || row.offsetHeight);
      content_height += row_height;
      i += 1;
    }

    end = i;

    const remaining = items.length - end;
    average_height = (top + content_height) / end;

    bottom = remaining * average_height;
    height_map.length = items.length;
  }

  async function handle_scroll() {
    const { scrollTop } = viewport;

    const old_start = start;

    for (let v = 0; v < rows.length; v += 1) {
      height_map[start + v] = itemHeight || rows[v].offsetHeight;
    }

    let i = 0;
    let y = 0;

    while (i < items.length) {
      const row_height = height_map[i] || average_height;
      if (y + row_height > scrollTop) {
        start = i;
        top = y;

        break;
      }

      y += row_height;
      i += 1;
    }

    while (i < items.length) {
      y += height_map[i] || average_height;
      i += 1;

      if (y > scrollTop + viewport_height) break;
    }

    end = i;

    const remaining = items.length - end;
    average_height = y / end;

    while (i < items.length) height_map[i++] = average_height;
    bottom = remaining * average_height;

    // prevent jumping if we scrolled up into unknown territory
    if (start < old_start) {
      await tick();

      let expected_height = 0;
      let actual_height = 0;

      for (let i = start; i < old_start; i += 1) {
        if (rows[i - start]) {
          expected_height += height_map[i];
          actual_height += itemHeight || rows[i - start].offsetHeight;
        }
      }

      const d = actual_height - expected_height;
      viewport.scrollTo(0, scrollTop + d);
    }

    // TODO if we overestimated the space these
    // rows would occupy we may need to add some
    // more. maybe we can just call handle_scroll again?
  }

  // trigger initial refresh
  onMount(() => {
    rows = contents.getElementsByClassName('vl-item') as HTMLCollectionOf<HTMLElement>;
    mounted = true;
  });
</script>

<div
  bind:this={viewport}
  bind:offsetHeight={viewport_height}
  on:scroll={handle_scroll}
  class="vl-wrapper"
  style="height: {height};"
>
  <PullToRefresh shouldPullToRefresh={() => !top} on:refresh>
    <span slot="icon">
      <FeatherIcon name="arrow-down" size="40" />
    </span>
    <ul
      bind:this={contents}
      class="vl-list"
      style="padding-top: {top}px; padding-bottom: {bottom}px;"
    >
      {#each visible as row (row.index)}
        <li class="vl-item">
          <slot item={row.data}>Missing template</slot>
        </li>
      {/each}
    </ul>
  </PullToRefresh>
</div>

<style lang="scss">
  div {
    position: relative;
    display: block;
    -webkit-overflow-scrolling: touch;
    overflow-y: auto;
    scrollbar-gutter: stable;
  }

  ul,
  li {
    display: block;
  }

  li {
    overflow: hidden;
  }

  span {
    color: $color-black;
  }
</style>
