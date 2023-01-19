<script lang="ts">
	import { getContext } from 'svelte';
	import { tabContextId } from './Tabs.svelte';

	export let id: string;

	const { selectedTab } = getContext(tabContextId);
</script>

{#if $selectedTab === id}
	<div
		class="relative flex justify-center _card mt-10 p-0 max-h-[600px] overflow-y-auto xl:overflow-x-hidden rounded-lg"
	>
		<slot />
	</div>
{/if}
