<script lang="ts">
	import { getContext } from 'svelte';
	import { tabContextId } from './Tabs.svelte';
	import clsx from 'clsx';
	import { browser } from '$app/environment';
	export let id: string;
	export let tooltip: string;

	const { selectedTab, selectTab } = getContext(tabContextId);
</script>

<div class="tooltip tooltip-bottom h-full w-1/3" data-tip={tooltip}>
	<button
		class={clsx('tab h-full w-full whitespace-nowrap', {
			'tab-active': $selectedTab === id
		})}
		on:click={() => {
			selectTab(id);
			if (browser) {
				if (window?.ackeeInstance) {
					//console.log('trackEvent selected-tab', id);
					window.ackeeInstance.action('6b97a1bf-9d1d-4cf5-a9f1-165b7fc5cfcc', {
						key: id,
						value: 1
					});
				}
			}
		}}
	>
		<slot />
	</button>
</div>
