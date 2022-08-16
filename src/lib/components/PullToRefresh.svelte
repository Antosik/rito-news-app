<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';

  export let distThreshold = 60;
  export let distMax = 80;
  export let distReload = 50;
  export let distIgnore = 0;
  export let refreshTimeout = 500;
  export let resistanceFunction = (t: number) => Math.min(1, t / 2.5);
  export let shouldPullToRefresh = () => mainEl && !mainEl.scrollTop;

  enum State {
    PENDING = 'pending',
    PULLING = 'pulling',
    RELEASING = 'releasing',
    REFRESHING = 'refreshing'
  }

  let mainEl: HTMLDivElement;
  let mainElTop = shouldPullToRefresh();
  let ptrEl: HTMLDivElement;
  let _timer: ReturnType<typeof setTimeout>;
  let showPtr = false;
  let dispatch = createEventDispatcher();

  let ptrMinHeight: string;
  let timer: ReturnType<typeof setTimeout>;
  let pullStartY: number | null = null;
  let pullMoveY: number | null = null;
  let state: State = State.PENDING;
  let dist = 0;
  let distExtra = 0;
  let distResisted = 0;

  function getScreenY(e: TouchEvent) {
    return e.touches?.[0]?.screenY ?? null;
  }

  function _onTouchStart(e: TouchEvent) {
    if (state === State.PENDING) {
      showPtr = true;

      if (shouldPullToRefresh()) {
        pullStartY = getScreenY(e);
      }

      clearTimeout(timer);
    }
  }

  function _onTouchMove(e: TouchEvent) {
    if (!ptrEl) {
      return;
    }

    if (!pullStartY) {
      if (shouldPullToRefresh()) {
        pullStartY = getScreenY(e);
      }
    } else {
      pullMoveY = getScreenY(e);
    }

    if (state === State.REFRESHING) {
      if (
        e.cancelable &&
        shouldPullToRefresh() &&
        pullStartY &&
        pullMoveY &&
        pullStartY < pullMoveY
      ) {
        e.preventDefault();
      }

      return;
    }

    if (state === State.PENDING) {
      state = State.PULLING;
    }

    if (pullStartY && pullMoveY) {
      dist = pullMoveY - pullStartY;
    }
    distExtra = dist - distIgnore;

    if (distExtra > 0) {
      if (e.cancelable) {
        e.preventDefault();
      }

      ptrMinHeight = `${distResisted}px`;
      distResisted = resistanceFunction(distExtra / distThreshold) * Math.min(distMax, distExtra);

      if (state === State.PULLING && distResisted > distThreshold) {
        state = State.RELEASING;
      }

      if (state === State.RELEASING && distResisted < distThreshold) {
        state = State.PULLING;
      }
    }
  }

  function _onTouchEnd() {
    if (!ptrEl) {
      return;
    }

    // wait 1/2 sec before unmounting...
    clearTimeout(_timer);
    _timer = setTimeout(() => {
      if (ptrEl && state === State.PENDING) {
        onReset();
      }
    }, 500);

    if (state === State.RELEASING && distResisted > distThreshold) {
      state = State.REFRESHING;
      ptrMinHeight = `${distReload}px`;

      timer = setTimeout(
        () => Promise.resolve(dispatch('refresh')).then(() => onReset()),
        refreshTimeout
      );
    } else {
      if (state === State.REFRESHING) {
        return;
      }

      ptrMinHeight = '0px';
      state = State.PENDING;
    }

    pullStartY = null;
    pullMoveY = null;
    dist = 0;
    distResisted = 0;
  }

  function _onScroll() {
    if (mainEl) {
      mainElTop = shouldPullToRefresh();
    }
  }

  function onReset() {
    state = State.PENDING;
    ptrMinHeight = '0px';
    showPtr = false;
  }

  onMount(() => {
    dispatch('init');
  });
</script>

<div
  class="ptr-wrapper"
  class:top={mainElTop}
  bind:this={mainEl}
  on:scroll={_onScroll}
  on:touchstart={_onTouchStart}
  on:touchend={_onTouchEnd}
  on:touchmove|passive={_onTouchMove}
>
  {#if showPtr}
    <div
      class="ptr"
      class:release={state === State.RELEASING}
      class:pull={state === State.PULLING}
      class:refresh={state === State.REFRESHING}
      bind:this={ptrEl}
      style:min-height={ptrMinHeight}
    >
      <div class="box">
        <div class="content">
          {#if $$slots.icon}
            <div class="icon"><slot name="icon" {state} /></div>
          {/if}
          {#if $$slots.text}
            <div class="text"><slot name="text" {state} /></div>
          {/if}
        </div>
      </div>
    </div>
  {/if}

  <slot />
</div>

<style lang="scss">
  .ptr-wrapper {
    display: contents;
  }
  .ptr {
    pointer-events: none;
    font-size: 0.85em;
    font-weight: bold;
    top: 0;
    height: 0;
    transition: height 0.3s, min-height 0.3s;
    text-align: center;
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
    align-content: stretch;
  }
  .box {
    padding: 10px;
    flex-basis: 100%;
  }
  .pull {
    transition: none;
  }
  .text {
    margin-top: 0.33em;
    color: rgba(0, 0, 0, 0.3);
  }
  .icon {
    color: rgba(0, 0, 0, 0.3);
    transition: transform 0.3s;
  }
  /*
    When at the top of the page, disable vertical overscroll so passive touch
    listeners can take over.
  */
  .top {
    touch-action: pan-x pan-down pinch-zoom;
  }
  .release .icon {
    transform: rotate(180deg);
  }
</style>
