<script lang="ts">
	import type { PageServerData } from './$types';
	export let data: PageServerData;

	import Comparison from '$lib/ui/Comparison.svelte';
	import Tabs from '$lib/ui/Tabs/Tabs.svelte';
	import TabList from '$lib/ui/Tabs/TabList.svelte';
	import Tab from '$lib/ui/Tabs/Tab.svelte';
	import TabPanel from '$lib/ui/Tabs/TabPanel.svelte';
	import ComparisonRace from '$lib/ui/ComparisonRace.svelte';
	import { fade } from 'svelte/transition';

	let items = data.drivers.values.map((driver) => ({
		value: driver.Driver,
		label: driver['Full Name'],
		group: driver['Team']
	}));

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
	let selectedId = 'h2h';
	const getDrivers = (driver1: string, driver2: string) => {
		if (
			!(
				driver1 !== undefined &&
				driver2 !== undefined &&
				driver1 !== 'Select first driver' &&
				driver2 !== 'Select second driver'
			)
		)
			return;
		const drivers = data.drivers.values.filter((driver) => {
			return driver.Driver === driver1 || driver.Driver === driver2;
		});
		let driver1Data = drivers[0];
		let driver2Data = drivers[1];

		let driver1HLM = parseFloat(driver1Data['HLM Rating']);
		let driver2HLM = parseFloat(driver2Data['HLM Rating']);
		let driver1Media = parseFloat(driver1Data['Media Rating']);
		let driver2Media = parseFloat(driver2Data['Media Rating']);
		driver1Data = {
			...driver1Data,
			hlmRating: {
				value: driver1HLM,
				diff: driver1HLM - driver2HLM
			},
			mediaRating: {
				value: driver1Media,
				diff: driver1Media - driver2Media
			},
			points: {
				value: driver1Data['points'],
				diff: driver1Data['points'] - driver2Data['points']
			},
			wins: {
				value: driver1Data['wins'],
				diff: driver1Data['wins'] - driver2Data['wins']
			},
			position: {
				value: driver1Data['position'],
				diff: driver2Data['position'] - driver1Data['position']
			}
		};

		driver2Data = {
			...driver2Data,
			hlmRating: {
				value: driver2HLM,
				diff: driver2HLM - driver1HLM
			},
			mediaRating: {
				value: driver2Media,
				diff: driver2Media - driver1Media
			},
			points: {
				value: driver2Data['points'],
				diff: driver2Data['points'] - driver1Data['points'].value
			},
			wins: {
				value: driver2Data['wins'],
				diff: driver2Data['wins'] - driver1Data['wins'].value
			},
			position: {
				value: driver2Data['position'],
				diff: driver1Data['position'].value - driver2Data['position']
			}
		};

		return {
			driver1Data,
			driver2Data,
			sameTeamDriver: driver1Data['Team'] === driver2Data['Team']
		};
	};
	$: driversData = getDrivers(driver1, driver2);
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
							<option disabled={driver2 === item.value} value={item.value}>{item.label}</option>
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
							<option disabled={driver1 === item.value} value={item.value}>{item.label}</option>
						{/each}
					</optgroup>
				{/each}
			</select>
		</div>
	</div>

	<Tabs {selectedId}>
		<TabList>
			<Tab tooltip="Overview between the two drivers" id="h2h">H2H Comparison</Tab>
			<Tab tooltip="Qualification times for each driver per circuit" id="quali">Quali Data</Tab>
			<Tab tooltip="Average race pace times for each driver per circuit" id="race">Race Data</Tab>
		</TabList>

		{#if driver1 !== undefined && driver2 !== undefined && driver1 !== 'Select first driver' && driver2 !== 'Select second driver' && !driversData.sameTeamDriver}
			<div
				transition:fade
				class="alert alert-warning shadow-lg mt-8 w-fit text-sm mx-auto flex items-center justify-center"
			>
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="stroke-current flex-shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/></svg
					>
					<span
						>Disclaimer: Drivers are not from the same team. Some pace averages for Qualifying or
						Race could be not accurate for comparison</span
					>
				</div>
			</div>
		{/if}

		<TabPanel id="h2h">
			{#if driver1 !== undefined && driver2 !== undefined && driver1 !== 'Select first driver' && driver2 !== 'Select second driver'}
				<Comparison
					h2h={data.h2h}
					{driversData}
					qualiData={data.quali.values}
					raceData={data.race.values}
				/>
			{:else}
				<h2 class="p-4">Please select two drivers to compare</h2>
			{/if}
		</TabPanel>

		<TabPanel id="quali">
			{#if driver1 !== undefined && driver2 !== undefined && driver1 !== 'Select first driver' && driver2 !== 'Select second driver'}
				<ComparisonRace raceData={data.quali.values} {driversData} />
			{:else}
				<h2 class="p-4">Please select two drivers to compare</h2>
			{/if}
		</TabPanel>

		<TabPanel id="race">
			{#if driver1 !== undefined && driver2 !== undefined && driver1 !== 'Select first driver' && driver2 !== 'Select second driver'}
				<ComparisonRace type="race" raceData={data.race.values} {driversData} />
			{:else}
				<h2 class="p-4">Please select two drivers to compare</h2>
			{/if}
		</TabPanel>
	</Tabs>
</div>
