<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  import FeatherIcon from '$lib/atoms/FeatherIcon.svelte';

  let isOpened = false;

  export const open = () => {
    dialogElement?.showModal();
    isOpened = true;
  };

  export const close = () => {
    dialogElement?.close();
    isOpened = false;
  };

  let dialogElement: HTMLDialogElement;

  const dispatch = createEventDispatcher<{
    open: void;
    close: void;
  }>();

  function handleDiaglogBackdropClick(e: MouseEvent & { currentTarget: HTMLDialogElement }) {
    if (e.target === e.currentTarget) {
      e.currentTarget.close();
    }
  }

  function handleModalClose() {
    dispatch('close');
  }
</script>

<aside>
  <slot />
</aside>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialogElement}
  transition:fade={{ duration: 200 }}
  on:mousedown={handleDiaglogBackdropClick}
  on:close={handleModalClose}
>
  <button type="button" on:click={() => dialogElement.close()}>
    <FeatherIcon name="x" size="14" />
  </button>
  <div transition:fly={{ x: 1000, opacity: 1 }}>
    <slot {isOpened} />
  </div>
</dialog>

<style lang="scss">
  aside {
    display: none;
    overflow: auto;
    background: $color-white;

    @include breakpoint(lg) {
      position: relative;
      top: var(--header-size, 100px);
      display: block;
      width: 35%;
      padding: grid(4) grid(8) grid(8);
    }
  }

  dialog {
    overflow: visible;
    padding: 0;
    border: 0;

    &::backdrop {
      background: color_adjust_alpha($color: $color-black, $amount: 0.7);
    }

    & > button {
      position: absolute;
      top: grid(1);
      right: grid(1);
    }
  }

  div {
    position: absolute;
    z-index: 20;
    top: 0;
    left: 20vw;
    width: 80vw;
    height: 100vh;
    max-height: 100vh;
    padding: grid(8);
    background: $color-white;
    border-bottom-left-radius: 6px;
    border-top-left-radius: 6px;
  }
</style>
