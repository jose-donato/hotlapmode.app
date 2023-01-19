<script>
	import { page } from '$app/stores';
	import clsx from 'clsx';
	import '../app.css';

	/** @type {string} */
	let path;

	$: path = $page.url.pathname;
</script>

<div class="absolute inset-0 -z-10 mx-0 max-w-none overflow-hidden">
	<div
		class="absolute left-1/2 top-0 ml-[-38rem] h-[25rem] w-[81.25rem] dark:[mask-image:linear-gradient(white,transparent)]"
	>
		<div
			class="absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] from-white/30 to-primary/30 opacity-100"
		/>
	</div>
</div>

<header
	class="navbar shadow-lg backdrop-filter backdrop-blur-xl bg-base-100/20 z-50 border-b border-white/10"
>
	<div class="navbar-start">
		<div class="dropdown">
			<label tabindex="0" class="btn btn-ghost lg:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/></svg
				>
			</label>
			<ul
				tabindex="0"
				class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-fit"
			>
				<li tabindex="0">
					<a class="font-bold tracking-wide">
						2022
						<svg
							class="fill-current"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg
						>
					</a>
					<ul class="p-2">
						<li>
							<a
								href="/"
								class={clsx('font-bold tracking-wide text', {
									underline: path === '/'
								})}>Drivers</a
							>
						</li>
						<li>
							<a
								href="/teams"
								class={clsx('font-bold tracking-wide', {
									underline: path === '/teams'
								})}>Teams</a
							>
						</li>
					</ul>
				</li>
				<li>
					<div data-tip="Coming soon" class="tooltip tooltip-bottom cursor-wait">
						<span class="font-bold tracking-wide float-left"> 2023 </span>
					</div>
				</li>
			</ul>
		</div>
		<a
			href="/"
			class="lowercase font-bold btn btn-ghost text-xl bg-gradient-to-r bg-clip-text text-transparent from-orange-500 via-orange-300 to-orange-600 motion-reduce:animate-none animate-text"
		>
			hotlapmode.app
		</a>
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			<li tabindex="0">
				<a class="font-bold tracking-wide">
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
				<ul class="p-2">
					<li>
						<a
							href="/"
							class={clsx('font-bold tracking-wide', {
								underline: path === '/'
							})}>Drivers</a
						>
					</li>
					<li>
						<a
							href="/teams"
							class={clsx('font-bold tracking-wide', {
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
	<div class="navbar-end">
		<a class="btn btn-primary">Share</a>
	</div>
</header>

<main class="w-[95%] md:w-full mx-auto pt-10 min-h-[70vh]">
	<slot />
</main>
<footer class="footer footer-center p-10 text-base-content">
	<div>
		<a
			href="/"
			class="lowercase font-bold btn btn-ghost text-xl relative bg-gradient-to-r bg-clip-text text-transparent from-orange-500 via-orange-300 to-orange-600 motion-reduce:animate-none animate-text"
		>
			hotlapmode.app
		</a>
		<p class="">
			This website was made in a collaborative effort between <a
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
		<div class="flex gap-4">
			<a
				class="hover:text-primary"
				target="_blank"
				rel="noreferrer noopener"
				href="https://twitter.com/hotlapmode"
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
				class="hover:text-primary"
				target="_blank"
				rel="noreferrer noopener"
				href="mailto:officialhotlapmode@gmail.com"
			>
				<svg
					stroke="currentColor"
					fill="currentColor"
					stroke-width="0"
					viewBox="0 0 512 512"
					height="1em"
					width="1em"
					xmlns="http://www.w3.org/2000/svg"
					class="fill-current w-6 h-6"
					><path
						d="M424 80H88a56.06 56.06 0 00-56 56v240a56.06 56.06 0 0056 56h336a56.06 56.06 0 0056-56V136a56.06 56.06 0 00-56-56zm-14.18 92.63l-144 112a16 16 0 01-19.64 0l-144-112a16 16 0 1119.64-25.26L256 251.73l134.18-104.36a16 16 0 0119.64 25.26z"
					/></svg
				>
			</a>
		</div>
	</div>
</footer>
