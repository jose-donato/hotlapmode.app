<script lang="ts">
	import { getContext } from 'svelte';
	import { tabContextId } from './Tabs.svelte';
	import clsx from 'clsx';
	export let id: string;

	const { selectedTab, selectTab } = getContext(tabContextId);
</script>

<button
	class={clsx(
		'tabs-item relative z-0 py-1 my-2 ml-2 text-center rounded-md w-full text-sm cursor-pointer select-none focus:outline-white',
		{
			active: $selectedTab === id
		}
	)}
	on:click={() => selectTab(id)}
>
	<slot />
</button>
