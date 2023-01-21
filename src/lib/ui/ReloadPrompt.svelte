<script lang="ts">
	import { fade } from 'svelte/transition';
	import { useRegisterSW } from 'virtual:pwa-register/svelte';
	const { needRefresh, updateServiceWorker, offlineReady } = useRegisterSW({
		onRegistered(r) {
			// uncomment following code if you want check for updates
			// r && setInterval(() => {
			//    console.log('Checking for sw update')
			//    r.update()
			// }, 20000 /* 20s for testing purposes */)
			console.log(`SW Registered: ${r}`);
		},
		onRegisterError(error) {
			console.log('SW registration error', error);
		}
	});
	const close = () => {
		offlineReady.set(false);
		needRefresh.set(false);
	};
	$: toast = $offlineReady || $needRefresh;
</script>

{#if toast}
	<div
		transition:fade
		class="fixed right-4 bottom-4 alert border border-white/10 shadow-lg w-fit"
		role="alert"
	>
		<div class="message">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="stroke-current flex-shrink-0 w-6 h-6"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			{#if $offlineReady}
				<span> App ready to work offline </span>
			{:else}
				<span> New content available, click on reload button to update. </span>
			{/if}
		</div>
		<div class="flex-none">
			<button class="btn btn-sm btn-ghost" on:click={close}> Close </button>
			{#if $needRefresh}
				<button class="btn btn-sm btn-primary" on:click={() => updateServiceWorker(true)}>
					Reload
				</button>
			{/if}
		</div>
	</div>
{/if}

<style>
	.pwa-toast button {
		border: 1px solid #8885;
		outline: none;
		margin-right: 5px;
		border-radius: 2px;
		padding: 3px 10px;
	}
</style>
