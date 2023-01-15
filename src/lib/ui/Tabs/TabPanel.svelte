<script lang="ts">
	import { getContext } from 'svelte';
	import { tabContextId } from './Tabs.svelte';

	export let id: string;

	const { selectedTab } = getContext(tabContextId);
</script>

{#if $selectedTab === id}
	<div class="relative flex justify-center card mt-10 p-4">
		<slot />
	</div>
{/if}
