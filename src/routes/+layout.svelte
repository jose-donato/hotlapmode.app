<script>
	import { page } from '$app/stores';
	import clsx from 'clsx';
	import '../app.css';

	/** @type {string} */
	let path;

	$: path = $page.url.pathname;

	import { onMount } from 'svelte';
	import { pwaInfo } from 'virtual:pwa-info';

	let ReloadPrompt;
	onMount(async () => {
		pwaInfo && (ReloadPrompt = (await import('$lib/ui/ReloadPrompt.svelte')).default);
	});

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<svelte:head>
	{@html webManifest}
</svelte:head>

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
					<div class="font-bold tracking-wide">
						2022
						<svg
							class="fill-current"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg
						>
					</div>
					<ul class="p-2 shadow-lg bg-base-100">
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
			class="lowercase font-bold btn btn-ghost text-xl bg-gradient-to-r bg-clip-text text-transparent from-primary via-second-red to-primary motion-reduce:animate-none animate-text"
		>
			hotlapmode.app
		</a>
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			<li tabindex="0">
				<div class="font-bold tracking-wide">
					2022
					<svg
						class="fill-current"
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg
					>
				</div>
				<ul class="p-2 shadow-lg bg-base-100">
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
		<a
			class="btn btn-primary hidden md:flex"
			href="https://twitter.com/intent/tweet?text=Check%20out%20the%20new%20fastest%20way%20to%20compare%20F1%20drivers%20and%20teams%20today.%20Developed%20by%20%40josedonato__%20and%20%40hotlapmode&url=https%3A%2F%2Fhotlapmode.app"
			>Share</a
		>
		<button
			class="btn btn-primary md:hidden"
			on:click={() => {
				navigator.share({
					title:
						'Check out the new fastest way to compare F1 drivers and teams today. Developed by @josedonato__ and @hotlapmode',
					url: 'https://hotlapmode.app'
				});
			}}
		>
			Share
		</button>
	</div>
</header>

<main class="w-[95%] md:w-full mx-auto pt-10 min-h-[50vh]">
	<slot />
</main>
{#if ReloadPrompt}
	<svelte:component this={ReloadPrompt} />
{/if}
<footer class="footer footer-center p-10 text-base-content">
	<div class="max-w-[640px]">
		<a
			href="/"
			class="lowercase font-bold btn btn-ghost text-xl relative bg-gradient-to-r bg-clip-text text-transparent from-primary via-second-red to-primary motion-reduce:animate-none animate-text"
		>
			hotlapmode.app
		</a>
		<p class="">
			Data provided by <a
				target="_blank"
				rel="noopener noreferrer"
				class="underline"
				href="https://twitter.com/hotlapmode">@hotlapmode</a
			>
			and website developed by
			<a
				target="_blank"
				rel="noopener noreferrer"
				class="underline"
				href="https://twitter.com/josedonato__">@jose-donato</a
			> using SvelteKit and DaisyUI. Any question feel free to DM us on twitter. We are always open to
			hearing your feedback.
		</p>
		<p class="opacity-70">Copyright © 2023 - All right reserved</p>
	</div>
</footer>
