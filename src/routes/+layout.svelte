<script>
	import { page } from '$app/stores';
	import clsx from 'clsx';
	import '../app.css';

	/** @type {string} */
	let path;

	$: path = $page.url.pathname;
</script>

<header
	class="navbar shadow-lg backdrop-filter backdrop-blur-xl bg-base-300/80 z-50 border-b border-white/10"
>
	<div class="flex-1">
		<a
			href="/"
			class="uppercase tracking-widest font-bold btn btn-ghost text-xl relative text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-500"
		>
			HotLapMode
		</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			<li tabindex="0">
				<a class="font-bold tracking-wide hover:underline underline">
					2022
					<svg
						class="fill-current"
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg
					>
				</a>
				<ul class="p-2 bg-base-100">
					<li>
						<a
							href="/"
							class={clsx('font-bold tracking-wide hover:underline', {
								underline: path === '/'
							})}>Drivers</a
						>
					</li>
					<li>
						<a
							href="/teams"
							class={clsx('font-bold tracking-wide hover:underline', {
								underline: path === '/teams'
							})}>Teams</a
						>
					</li>
				</ul>
			</li>
			<li>
				<div data-tip="Coming soon" class="tooltip tooltip-bottom cursor-wait">
					<span class="font-bold tracking-wide"> 2023 </span>
				</div>
			</li>
		</ul>
	</div>
</header>
<main class="w-[95%] md:w-full mx-auto pt-10 min-h-[70vh]">
	<slot />
</main>
<footer class="footer footer-center p-10 text-base-content">
	<div>
		<p class="font-bold">hotlapmode.app</p>
		<p class="">
			This website was made in a collaborative effort by <a
				target="_blank"
				rel="noopener noreferrer"
				class="underline"
				href="https://twitter.com/josedonato__">@jose-donato</a
			>
			and
			<a
				target="_blank"
				rel="noopener noreferrer"
				class="underline"
				href="https://twitter.com/hotlapmode">@hotlapmode</a
			>.
		</p>
		<p>Copyright © 2023 - All right reserved</p>
	</div>
	<div>
		<div class="grid grid-flow-col gap-4">
			<a
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					class="fill-current"
					><path
						d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
					/></svg
				></a
			>
			<a
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					class="fill-current"
					><path
						d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
					/></svg
				></a
			>
			<a
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					class="fill-current"
					><path
						d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
					/></svg
				></a
			>
		</div>
	</div>
</footer>
