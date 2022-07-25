<script lang="ts">
  import { onMount } from 'svelte';

  export let query: string;

  let mql: MediaQueryList;
  let mqlListener: (e: MediaQueryListEvent) => void;
  let wasMounted = false;
  let matches = false;

  onMount(() => {
    wasMounted = true;

    mql = window.matchMedia(query);
    matches = mql.matches;

    return () => {
      removeActiveListener();
    };
  });

  $: {
    if (wasMounted) {
      removeActiveListener();
      addNewListener(query);
    }
  }

  function addNewListener(query: string) {
    mql = window.matchMedia(query);
    mqlListener = (v) => (matches = v.matches);

    mql.addEventListener
      ? mql.addEventListener('change', mqlListener)
      : mql.addListener(mqlListener);

    matches = mql.matches;
  }

  function removeActiveListener() {
    if (mql && mqlListener) {
      mql.removeEventListener
        ? mql.removeEventListener('change', mqlListener)
        : mql.removeListener(mqlListener);
    }
  }
</script>

<slot {matches} />
