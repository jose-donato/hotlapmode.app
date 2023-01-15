<script lang="ts">
	import type { PageServerData } from './$types';
	import { fade } from 'svelte/transition';
	import Toggle from 'svelte-toggle';

	export let data: PageServerData;

	import Select from 'svelte-select';
	import AdvancedComparison from '$lib/ui/AdvancedComparison.svelte';
	import Comparison from '$lib/ui/Comparison.svelte';
	import Tabs from '$lib/ui/Tabs/Tabs.svelte';
	import TabList from '$lib/ui/Tabs/TabList.svelte';
	import Tab from '$lib/ui/Tabs/Tab.svelte';
	import TabPanel from '$lib/ui/Tabs/TabPanel.svelte';
	import ComparisonQuali from '$lib/ui/ComparisonQuali.svelte';
	import ComparisonRace from '$lib/ui/ComparisonRace.svelte';

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

	//TODO: figure out when state it out of date

	let unique = {};

	let selectedId = 'h2h';
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

	<Tabs {selectedId}>
		<TabList>
			<Tab id="h2h">H2H Comparison</Tab>
			<Tab id="quali">Quali Data</Tab>
			<Tab id="race">Race Data</Tab>
		</TabList>

		<TabPanel id="h2h">
			{#if driver1 && driver2}
				{#key unique}
					<Comparison
						qualiData={data.quali.values}
						raceData={data.race.values}
						driversData={data.drivers.values}
						{driver1}
						{driver2}
					/>
				{/key}
			{:else}
				<h2>Please select two drivers to compare</h2>
			{/if}
		</TabPanel>

		<TabPanel id="quali">
			{#if driver1 && driver2}
				{#key unique}
					<ComparisonQuali
						qualiData={data.quali.values}
						driversData={data.drivers.values}
						{driver1}
						{driver2}
					/>
				{/key}
			{:else}
				<h2>Please select two drivers to compare</h2>
			{/if}
		</TabPanel>

		<TabPanel id="race">
			{#if driver1 && driver2}
				{#key unique}
					<ComparisonRace
						raceData={data.race.values}
						driversData={data.drivers.values}
						{driver1}
						{driver2}
					/>
				{/key}
			{:else}
				<h2>Please select two drivers to compare</h2>
			{/if}
		</TabPanel>
	</Tabs>
</div>
