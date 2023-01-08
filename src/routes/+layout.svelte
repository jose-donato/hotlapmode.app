<script>
	import '../app.css';
</script>

<header
	class="px-4 py-4 flex items-center justify-center fixed w-full shadow-lg backdrop-filter backdrop-blur-xl bg-grey-800/30 z-50 border-b border-white/10"
>
	<a href="/" class="flex gap-2 uppercase tracking-widest font-bold items-center">
		<h1>Formula 1 Stats</h1>
		<span class="text-4xl mb-4">🏎️</span>
	</a>
</header>
<main class="pt-24">
	<slot />
</main>
