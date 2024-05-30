<script lang="ts">
  import type { Source } from '$lib/types/sources';

  import { t } from 'svelte-intl-precompile';

  import lolLogo from '$lib/icons/lol.svg';
  import lolEsportsLogo from '$lib/icons/lol_esports.svg';
  import lorLogo from '$lib/icons/lor.svg';
  import riotgamesLogo from '$lib/icons/riotgames.svg';
  import tftLogo from '$lib/icons/tft.svg';
  import valLogo from '$lib/icons/val.svg';
  import valEsportsLogo from '$lib/icons/val_esports.svg';
  import wrLogo from '$lib/icons/wr.svg';
  import wrEsportsLogo from '$lib/icons/wr_esports.svg';

  export let className: string | undefined = undefined;
  export let source: Source;
  export let size = 24;

  const sourcesIcons: Record<Source, string> = {
    lol: lolLogo,
    lol_esports: lolEsportsLogo,
    lor: lorLogo,
    riotgames: riotgamesLogo,
    tft: tftLogo,
    val: valLogo,
    val_esports: valEsportsLogo,
    wr: wrLogo,
    wr_esports: wrEsportsLogo,
  };
</script>

<img
  src={sourcesIcons[source]}
  class={className}
  alt={$t(`sources.${source}`)}
  width={size}
  height={size}
/>
