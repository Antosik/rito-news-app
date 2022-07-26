<script lang="ts">
  import type { DivIconOptions, MapOptions, TileLayerOptions } from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import { locale, t } from 'svelte-intl-precompile';
  import { LeafletMap, TileLayer, Marker, DivIcon, Popup } from 'svelte-leafletjs?client';

  import { browser } from '$app/env';

  import markers from '$lib/api/offices.json';
  import FeatherIcon from '$lib/components/FeatherIcon.svelte';
  import { Locale, localeToRiotGamesLocaleMap } from '$lib/types/locale';

  export let selected: number[] = [];

  $: riotLocale = localeToRiotGamesLocaleMap[$locale as Locale];

  const mapOptions: MapOptions = {
    center: [0, 0],
    zoom: 1,
    attributionControl: false,
    worldCopyJump: true
  };

  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  const tileLayerOptions: TileLayerOptions = {
    minZoom: 1,
    maxZoom: 9,
    maxNativeZoom: 9,
    attribution: '© OpenStreetMap contributors'
  };

  const riotgames = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="currentColor"/><path fill="#fff" d="m25.891 13.176-13.307 6.286 2.058 9.473h2.714l-.469-6.776.417-.129 1.632 6.905h2.82l-.104-8.254.416-.129 1.427 8.383h2.986l.704-9.97.416-.13.739 10.1h3.948l1.39-13.865zM23.612 32.813l-.984-2.535 9.49.488-.407 4.058z"/></svg>`;

  const iconOptions: DivIconOptions = {
    html: riotgames,
    iconSize: [24, 24]
  };

  const toggleSelect = (id: number) => {
    if (selected.includes(id)) {
      selected = selected.filter((el) => el != id);
    } else {
      selected = [...selected, id];
    }
  };
</script>

<div id="map">
  {#if browser}
    <LeafletMap options={mapOptions}>
      <TileLayer url={tileUrl} options={tileLayerOptions} />
      {#each markers as marker (marker.id)}
        <Marker latLng={[marker.lat, marker.lan]}>
          <DivIcon
            options={{
              ...iconOptions,
              className: `riotgames-icon${
                selected.length === 0 || selected.includes(marker.id) ? ' selected' : ''
              }`
            }}
          />
          <Popup>
            <div class="popup">
              Office in {marker.name}
              <div class="controls">
                <a
                  href="https://www.riotgames.com/{riotLocale}/o/{marker.id}"
                  target="_blank"
                  class="control"
                  rel="noopener noreferrer"
                >
                  Show info
                </a>
                <button
                  aria-label={$t('select')}
                  type="button"
                  class="control"
                  on:click={() => toggleSelect(marker.id)}
                >
                  <FeatherIcon name={selected.includes(marker.id) ? 'check' : 'filter'} size="14" />
                </button>
              </div>
            </div>
          </Popup>
        </Marker>
      {/each}
    </LeafletMap>
  {/if}
</div>

<style lang="scss">
  #map {
    width: 100%;
    height: 100%;
    position: relative;
  }

  :global(.riotgames-icon.selected) {
    color: $color-riotgames;
  }

  .popup {
    display: flex;
    flex-direction: column;
    gap: grid(2);

    .controls {
      display: flex;
      gap: grid(1);

      .control {
        padding: grid(1) grid(2);
        background: $color-riotgames;
        color: $color-white;
        text-align: center;
      }

      a {
        flex: 1;
      }

      button {
        @include flex_center;
        border: 0;
      }
    }
  }
</style>
