<script lang="ts">
  import { t } from 'svelte-intl-precompile';

  import Modal from '$lib/components/Modal.svelte';

  export const open = () => modal.open();
  export const close = () => modal.close();

  let modal: Modal;
</script>

<Modal bind:this={modal} on:open on:close>
  <div>
    <h2>{$t('about')}</h2>
    <p>{$t('about-text')}</p>
    <p>
      <a href="https://github.com/Antosik/rito-news-app" target="_blank">{$t('source-code')}</a> |
      <a href="https://github.com/Antosik/rito-news-feeds" target="_blank">rito-news-feeds</a> |
      <a href="https://github.com/Antosik/rito-news" target="_blank">rito-news</a>
    </p>
    <p>
      <a href="https://github.com/Antosik" target="_blank">Antosik</a>, 2024
    </p>
  </div>
</Modal>

<style lang="scss">
  div {
    display: flex;
    flex-direction: column;
    padding: grid(4) grid(8);
    gap: grid(3);

    @include breakpoint(md) {
      width: auto;
    }
  }

  h2,
  p {
    text-align: center;
  }

  h2 {
    margin-bottom: grid(3);
  }

  p {
    margin-bottom: grid(1);
  }

  a {
    text-decoration: underline;
  }
</style>
