<script lang="ts">
	import { getContext } from 'svelte';
	import { tabContextId } from './Tabs.svelte';
	import clsx from 'clsx';
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
		}}
	>
		<slot />
	</button>
</div>
