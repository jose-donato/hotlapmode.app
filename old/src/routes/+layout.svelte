<script>
	import { page } from '$app/stores';
	import clsx from 'clsx';
	import '../app.css';

	/** @type {string} */
	let path;

	$: path = $page.url.pathname;
</script>

<header
	class="py-4 flex items-center justify-between px-10 fixed w-full shadow-lg backdrop-filter backdrop-blur-xl bg-grey-800/30 z-50 border-b border-white/10"
>
	<a href="/" class="flex gap-2 uppercase tracking-widest font-bold items-center">
		<h1>Formula 1 Stats</h1>
		<span class="text-4xl mb-4">🏎️</span>
	</a>
	<div class="space-x-4">
		<a
			href="/"
			class={clsx('font-bold tracking-wide hover:underline', {
				underline: path === '/'
			})}>Drivers</a
		>
		<a
			href="/teams"
			class={clsx('font-bold tracking-wide hover:underline', {
				underline: path === '/teams'
			})}>Teams</a
		>
	</div>
</header>
<main class="pt-24">
	<slot />
</main>
