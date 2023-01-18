<script lang="ts">
	import { getContext } from 'svelte';
	import { tabContextId } from './Tabs.svelte';

	export let id: string;

	const { selectedTab } = getContext(tabContextId);
</script>

{#if $selectedTab === id}
	<div
		class="relative flex justify-center _card mt-10 p-4 max-h-[600px] overflow-y-auto xl:overflow-x-hidden"
	>
		<slot />
	</div>
{/if}
