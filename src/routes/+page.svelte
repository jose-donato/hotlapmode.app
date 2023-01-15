<script lang="ts">
	import type { PageServerData } from './$types';
	import { fade } from 'svelte/transition';
	import Toggle from 'svelte-toggle';

	export let data: PageServerData;

	import Select from 'svelte-select';
	import AdvancedComparison from '$lib/ui/AdvancedComparison.svelte';
	import Comparison from '$lib/ui/Comparison.svelte';

	let items = data.drivers.values.map((driver) => ({
		value: driver.Driver,
		label: driver['Full Name'],
		group: driver['Team']
	}));

	type itemType = {
		groupItem: boolean;
		value: string;
		label: string;
		group: string;
		selectable?: boolean;
	};

	const groupBy = (item: itemType) => item.group;

	let driver1: itemType;
	let driver2: itemType;

	let unique = {};
</script>

<div class="container mx-auto flex justify-center flex-col gap-6">
	<div>
		<label for="driver1">Driver 1</label>
		<Select
			id="driver1"
			placeholder="Select first driver to compare"
			--background="#070707ff"
			--list-background="#070707ff"
			--item-active-background="#131313ff"
			--item-hover-bg="#2a2a2aff"
			{items}
			{groupBy}
			bind:value={driver1}
		/>
	</div>
	{#if driver1}
		<div transition:fade>
			<label for="driver2">Driver 2</label>
			<Select
				id="driver2"
				--background="#070707ff"
				--list-background="#070707ff"
				--item-active-background="#131313ff"
				--item-hover-bg="#2a2a2aff"
				placeholder="Select second driver to compare"
				items={items.map((item) => {
					return {
						...item,
						selectable: driver1?.value !== item.value
					};
				})}
				{groupBy}
				bind:value={driver2}
			/>
		</div>
	{/if}
	<button class="btn mx-auto" on:click={() => (unique = {})}>Calculate</button>
	<!--<Toggle label="Advanced View" bind:toggled={advancedView} />-->
	{#if driver1 && driver2}
		{#key unique}
			<div>
				<Comparison
					qualiData={data.quali.values}
					raceData={data.race.values}
					driversData={data.drivers.values}
					{driver1}
					{driver2}
				/>
			</div>
		{/key}
	{/if}
</div>
