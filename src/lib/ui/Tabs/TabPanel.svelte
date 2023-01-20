<script lang="ts">
	import { getContext } from 'svelte';
	import { slide } from 'svelte/transition';
	import { tabContextId } from './Tabs.svelte';

	export let id: string;

	const { selectedTab } = getContext(tabContextId);
</script>

{#if $selectedTab === id}
	<div
		class="lg:relative flex justify-center _card mt-10 p-0 max-h-[600px] overflow-y-auto xl:overflow-x-hidden rounded-lg"
		transition:slide
	>
		<slot />
	</div>
{/if}
