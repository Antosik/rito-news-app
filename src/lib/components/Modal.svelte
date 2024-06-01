<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  import FeatherIcon from '$lib/atoms/FeatherIcon.svelte';

  export const open = () => {
    dialogElement?.showModal();
  };

  export const close = () => {
    dialogElement?.close();
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

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
  class="modal"
  bind:this={dialogElement}
  transition:fade={{ duration: 200 }}
  on:mousedown={handleDiaglogBackdropClick}
  on:close={handleModalClose}
>
  <button type="button" on:click={() => dialogElement.close()}>
    <FeatherIcon name="x" size="16" />
  </button>
  <slot />
</dialog>

<style lang="scss">
  dialog {
    position: absolute;
    z-index: 20;
    top: 50%;
    left: 50%;
    overflow: visible;
    width: max-content;
    max-width: 90%;
    padding: 0;
    border: 0;
    border-radius: 6px;
    background: $color-white;
    transform: translate(-50%, -50%);

    &::backdrop {
      background: color_adjust_alpha($color: $color-black, $amount: 0.7);
    }
  }

  button {
    position: absolute;
    top: grid(1);
    right: grid(1);
    border: 0;
    background: none;
  }
</style>
