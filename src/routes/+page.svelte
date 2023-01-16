<script lang="ts">
	import type { PageServerData } from './$types';
	import { fade } from 'svelte/transition';

	export let data: PageServerData;

	import Select from 'svelte-select';
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

	const groups = items.reduce((acc, item) => {
		const group = acc.find((g) => g.value === item.group);
		if (group) {
			group.items.push(item);
		} else {
			acc.push({
				value: item.group,
				label: item.group,
				items: [item]
			});
		}
		return acc;
	}, []);

	let driver1: string;
	let driver2: string;

	$: {
		console.log(driver1);
		console.log(driver2);
	}
	//TODO: figure out when state it out of date

	let unique = {};

	let selectedId = 'h2h';
</script>

<div class="container mx-auto flex justify-center flex-col gap-6">
	<div class="flex flex-col md:flex-row gap-4 mx-auto">
		<div class="flex flex-col gap-2">
			<label for="driver1">Driver 1</label>
			<select id="driver1" class="select select-bordered w-full max-w-xs" bind:value={driver1}>
				<option disabled selected>Select first driver</option>
				{#each groups as group}
					<optgroup label={group.label}>
						{#each group.items as item}
							<option
								disabled={driver2 && driver2.group === item.group && driver2.value === item.value}
								value={item.value}>{item.label}</option
							>
						{/each}
					</optgroup>
				{/each}
			</select>
		</div>
		<div class="flex flex-col gap-2">
			<label for="driver2">Driver 2</label>
			<select id="driver2" class="select select-bordered w-full max-w-xs" bind:value={driver2}>
				<option disabled selected>Select second driver</option>
				{#each groups as group}
					<optgroup label={group.label}>
						{#each group.items as item}
							<option
								disabled={driver1 && driver1.group === item.group && driver1.value === item.value}
								value={item.value}>{item.label}</option
							>
						{/each}
					</optgroup>
				{/each}
			</select>
		</div>
	</div>
	<button
		disabled={driver1 === undefined ||
			driver2 === undefined ||
			driver1 === 'Select first driver' ||
			driver2 === 'Select second driver'}
		class="btn mx-auto disabled:pointer-events-none disabled:opacity-50"
		on:click={() => (unique = {})}>Calculate</button
	>

	<Tabs {selectedId}>
		<TabList>
			<Tab tooltip="Overview between the two drivers" id="h2h">H2H Comparison</Tab>
			<Tab tooltip="Qualification times for each driver per circuit" id="quali">Quali Data</Tab>
			<Tab tooltip="Average race pace times for each driver per circuit" id="race">Race Data</Tab>
		</TabList>

		<TabPanel id="h2h">
			{#if driver1 !== undefined && driver2 !== undefined && driver1 !== 'Select first driver' && driver2 !== 'Select second driver'}
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
			{#if driver1 !== undefined && driver2 !== undefined && driver1 !== 'Select first driver' && driver2 !== 'Select second driver'}
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
			{#if driver1 !== undefined && driver2 !== undefined && driver1 !== 'Select first driver' && driver2 !== 'Select second driver'}
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
