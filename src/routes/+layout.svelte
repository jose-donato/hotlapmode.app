<script>
	import { page } from '$app/stores';
	import clsx from 'clsx';
	import '../app.css';

	/** @type {string} */
	let path;

	$: path = $page.url.pathname;
</script>

<header
	class="py-2 fixed w-full shadow-lg backdrop-filter backdrop-blur-xl bg-grey-800/30 z-50 border-b border-white/10"
>
	<div class="px-10 flex items-center justify-between border-b border-white/10">
		<a href="/" class="flex gap-2 uppercase tracking-widest font-bold items-center">
			<h1>HotLapMode</h1>
			<span class="text-4xl mb-4">🏎️</span>
		</a>
		<div class="space-x-4 flex gap-4">
			<a
				href="/"
				class={clsx('font-bold tracking-wide hover:underline underline', {
					underline: path === '/'
				})}>2022</a
			>
			<div data-tooltip="Coming soon" class="font-bold tracking-wide cursor-wait">2023</div>
		</div>
	</div>
	<nav class="px-4 flex items-center justify-center gap-4 pt-2">
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
	</nav>
</header>
<main class="pt-36 w-[90%] md:w-full mx-auto pb-20">
	<slot />
</main>
<footer
	class="fixed bottom-0 w-full flex justify-center items-center gap-4 py-2 border-t border-white/10 bg-grey-800/30 backdrop-filter backdrop-blur-xl"
>
	<p class="text-sm">
		This website was made in a collaborative effort by <a
			class="underline"
			href="https://twitter.com/josedonato__">@jose-donato</a
		>
		and
		<a class="underline" href="https://twitter.com/hotlapmode">@hotlapmode</a>.
	</p>
</footer>
