<script lang="ts">
	import { browser } from '$app/env';
	import { LeafletMap, TileLayer, Marker, DivIcon, Popup } from 'svelte-leafletjs?client';
	import 'leaflet/dist/leaflet.css';

	const mapOptions = {
		center: [0, 0],
		zoom: 2,
		attributionControl: false
	};
	const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	const tileLayerOptions = {
		minZoom: 0,
		maxZoom: 20,
		maxNativeZoom: 19,
		attribution: '© OpenStreetMap contributors'
	};

	const riotgames = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#d32f2f"/><path fill="#fff" d="m25.891 13.176-13.307 6.286 2.058 9.473h2.714l-.469-6.776.417-.129 1.632 6.905h2.82l-.104-8.254.416-.129 1.427 8.383h2.986l.704-9.97.416-.13.739 10.1h3.948l1.39-13.865zM23.612 32.813l-.984-2.535 9.49.488-.407 4.058z"/></svg>`;

	const iconOptions = {
		html: riotgames,
		iconSize: 24,
        className: 'riotgames-icon'
	};

	function loadJobs(): Promise<void> {
		return fetch(`https://rito-news.iamantosik.me/riotgames/en/jobs.json`)
			.then((res) => res.json())
			.then(console.log);
	}

	loadJobs();

	const markers = [
		{
			id: 27041,
			name: 'Barcelona, Spain',
            lat: 41.392696,
            lan: 2.144449,
		},
		{
			id: 1967,
			name: 'Berlin, Germany',
            lat: 52.518621, 
            lan: 13.375142,
		},
		{
			id: 48311,
			name: 'Dubai, UAE',
            lat: 25.197172,
            lan: 55.274274,
		},
		{
			id: 1246,
			name: 'Dublin, Ireland',
            lat: 53.340258,
            lan: -6.252831,
		},
		{
			id: 1423,
			name: 'Hong Kong, China',
            lat: 22.280162,
            lan: 114.165335,
		},
		{
			id: 1424,
			name: 'Istanbul, Turkey',
            lat: 41.011218,
            lan: 28.978178,
		},
		{
			id: 884,
			name: 'Los Angeles, USA',
            lat: 34.055863,
            lan: -118.246139,
		},
		{
			id: 2255,
			name: 'Mexico City, Mexico',
            lat: 19.432605,
            lan: -99.133296,
		},
		{
			id: 1425,
			name: 'Moscow, Russia',
            lat: 55.755819,
            lan: 37.617644,
		},
		{
			id: 22706,
			name: 'New Delhi, India',
            lat: 28.614243,
            lan: 77.202788,
		},
		{
			id: 45287,
			name: 'Other Locations',
            lat: -68.978,
            lan: 62.644,
		},
		{
			id: 14756,
			name: 'Paris, France',
            lat: 48.856663,
            lan: 2.351556,
		},
		{
			id: 83003,
			name: 'Reading, UK',
            lat: 51.460473,
            lan: -0.973226,
		},
		{
			id: 12979,
			name: 'SF Bay Area, USA',
            lat: 37.7654,
            lan: -122.3832,
		},
		{
			id: 1426,
			name: 'Sao Paulo, Brazil',
            lat: -23.544279,
            lan: -46.636972,
		},
		{
			id: 5690,
			name: 'Seoul, Korea',
            lat: 37.570705,
            lan: 126.976946,
		},
		{
			id: 5044,
			name: 'Shanghai, China',
            lat: 31.231311,
            lan: 121.470058,
		},
		{
			id: 72917,
			name: 'Singapore Publishing',
            lat: 1.2903,
            lan: 103.8374,
		},
		{
			id: 72889,
			name: 'Singapore Studio',
            lat: 1.2987,
            lan: 103.86154,
		},
		{
			id: 886,
			name: 'St. Louis, USA',
            lat: 38.635693,
            lan: -90.240729,
		},
		{
			id: 1429,
			name: 'Tokyo, Japan',
            lat: 35.681729,
            lan: 139.753927,
		}
	];
</script>

<div id="map">
	{#if browser}
		<LeafletMap options={mapOptions}>
			<TileLayer url={tileUrl} options={tileLayerOptions} />
			{#each markers as marker (marker.id)}
				<Marker latLng={[marker.lat, marker.lan]}>
					<DivIcon options={iconOptions} />
					<Popup>Office in {marker.name}</Popup>
				</Marker>
			{/each}
		</LeafletMap>
	{/if}
</div>


<style>
	#map {
		width: 100vw;
		height: 100vh;
	}
</style>
