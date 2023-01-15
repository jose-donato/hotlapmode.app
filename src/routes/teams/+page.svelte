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
	import ComparisonTeamRace from '$lib/ui/ComparisonTeamRace.svelte';
	import ComparisonTeam from '$lib/ui/ComparisonTeam.svelte';

	let items = data.teams.values.map((team) => ({
		value: team.Team,
		label: team['Full Team Name']
	}));

	type itemType = {
		groupItem: boolean;
		value: string;
		label: string;
		selectable?: boolean;
	};

	const groupBy = (item: itemType) => item.group;

	let team1: itemType;
	let team2: itemType;

	//TODO: figure out when state it out of date

	let unique = {};

	let selectedId = 'h2h';
</script>

<div class="container mx-auto flex justify-center flex-col gap-6">
	<div class="flex flex-col md:flex-row gap-4">
		<div class="md:w-1/2 flex flex-col gap-2">
			<label for="team1">Team 1</label>
			<Select
				id="team1"
				placeholder="Select first team to compare"
				--background="#333333ff"
				--list-background="#333333ff"
				--item-active-background="#131313ff"
				--item-hover-bg="#2a2a2aff"
				{items}
				{groupBy}
				bind:value={team1}
			/>
		</div>
		{#if team1}
			<div transition:fade class="md:w-1/2 flex flex-col gap-2">
				<label for="team2">Team 2</label>
				<Select
					id="team2"
					--background="#333333ff"
					--list-background="#333333ff"
					--item-active-background="#131313ff"
					--item-hover-bg="#2a2a2aff"
					placeholder="Select second team to compare"
					items={items.map((item) => {
						return {
							...item,
							selectable: team1?.value !== item.value
						};
					})}
					{groupBy}
					bind:value={team2}
				/>
			</div>
		{/if}
	</div>
	<button
		disabled={!team1 || !team2}
		class="btn mx-auto px-2 py-1 disabled:pointer-events-none disabled:opacity-50"
		on:click={() => (unique = {})}>Calculate</button
	>

	<Tabs {selectedId}>
		<TabList>
			<Tab tooltip="Overview between the two teams" id="h2h">H2H Comparison</Tab>
			<Tab tooltip="Qualification times for each team per circuit" id="quali">Quali Data</Tab>
			<Tab tooltip="Average race pace times for each team per circuit" id="race">Race Data</Tab>
		</TabList>

		<TabPanel id="h2h">
			{#if team1 && team2}
				{#key unique}
					<ComparisonTeam teamsData={data.teams.values} {team1} {team2} />
				{/key}
			{:else}
				<h2>Please select two teams to compare</h2>
			{/if}
		</TabPanel>

		<TabPanel id="quali">
			{#if team1 && team2}
				{#key unique}{/key}
			{:else}
				<h2>Please select two teams to compare</h2>
			{/if}
		</TabPanel>

		<TabPanel id="race">
			{#if team1 && team2}
				{#key unique}
					<ComparisonTeamRace teamsData={data.teamsRacePace.values} {team1} {team2} />
				{/key}
			{:else}
				<h2>Please select two teams to compare</h2>
			{/if}
		</TabPanel>
	</Tabs>
</div>
