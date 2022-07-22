<script lang="ts">
  import { t } from 'svelte-intl-precompile';

  import type { Source } from '$lib/types/sources';
  import lolLogo from '$lib/icons/lol.svg';
  import lorLogo from '$lib/icons/lor.svg';
  import riotgamesLogo from '$lib/icons/riotgames.svg';
  import tftLogo from '$lib/icons/tft.svg';
  import valLogo from '$lib/icons/val.svg';
  import wrLogo from '$lib/icons/wr.svg';

  export let source: Source;
  export let size: number = 24;

  const sourcesIcons: Record<Source, string> = {
    lol: lolLogo,
    lor: lorLogo,
    riotgames: riotgamesLogo,
    tft: tftLogo,
    val: valLogo,
    wr: wrLogo
  };
</script>

<img src={sourcesIcons[source]} alt={$t(`sources.${source}`)} width={size} height={size} />
