<script lang="ts">
  import { locale, t } from 'svelte-intl-precompile';

  import FeatherIcon from '$lib/atoms/FeatherIcon.svelte';
  import LanguageSelect from '$lib/components/LanguageSelect.svelte';
  import Modal from '$lib/components/Modal.svelte';

  export const open = () => modal.open();
  export const close = () => modal.close();

  let modal: Modal;
</script>

<Modal bind:this={modal} on:open on:close>
  <div>
    <h2 class="visually-hidden">{$t('change-language')}</h2>
    <label for="locale">
      <FeatherIcon name="globe" size="18" />
      <LanguageSelect
        id="locale"
        name="locale"
        --sms-open-z-index={10000}
        bind:selected={$locale}
      />
    </label>
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

  h2 {
    margin-bottom: grid(3);
  }

  label {
    @include flex_vcenter;

    gap: grid(2);
  }
</style>
