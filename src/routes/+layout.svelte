<script lang="ts">
  import { t } from 'svelte-intl-precompile';

  import '../app.scss';
  import { page } from '$app/stores';

  $: key = $page.route.id === '/jobs' ? 'jobs' : 'news';
  $: title = `rito.news - ${$t(key)}`;
  $: description = $t('about-text');
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:title" content={title} />
  <meta name="twitter:title" content={title} />
  <meta property="og:url" content={$page.url.toString()} />

  <meta name="description" content={description} />
  <meta property="og:description" content={description} />
  <meta name="twitter:description" content={description} />
</svelte:head>

<slot />
