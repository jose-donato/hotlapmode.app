<script lang="ts">
	import type { PageServerData } from './$types';
	export let data: PageServerData;

	import Tabs from '$lib/ui/Tabs/Tabs.svelte';
	import TabList from '$lib/ui/Tabs/TabList.svelte';
	import Tab from '$lib/ui/Tabs/Tab.svelte';
	import TabPanel from '$lib/ui/Tabs/TabPanel.svelte';
	import ComparisonTeam from '$lib/ui/ComparisonTeam.svelte';
	import ComparisonTeamRace from '$lib/ui/ComparisonTeamRace.svelte';

	let items = data.teams.values.map((team) => ({
		value: team.Team,
		label: team.Team
	}));

	let team1: string;
	let team2: string;

	let selectedId = 'h2h';

	const getTeams = (team1: string, team2: string) => {
		if (
			!(
				team1 !== undefined &&
				team2 !== undefined &&
				team1 !== 'Select first team' &&
				team2 !== 'Select second team'
			)
		)
			return;

		const teams = data.teams.values.filter((team) => {
			return team.Team === team1 || team.Team === team2;
		});
		let team1Data = teams[0];
		let team2Data = teams[1];

		team1Data = {
			...team1Data,
			points: {
				value: team1Data['points'],
				diff: team1Data['points'] - team2Data['points']
			},
			wins: {
				value: team1Data['wins'],
				diff: team1Data['wins'] - team2Data['wins']
			},
			position: {
				value: team1Data['position'],
				diff: team2Data['position'] - team1Data['position']
			}
		};

		team2Data = {
			...team2Data,
			points: {
				value: team2Data['points'],
				diff: team2Data['points'] - team1Data['points'].value
			},
			wins: {
				value: team2Data['wins'],
				diff: team2Data['wins'] - team1Data['wins'].value
			},
			position: {
				value: team2Data['position'],
				diff: team1Data['position'].value - team2Data['position']
			}
		};

		return { team1Data, team2Data };
	};
	$: teamsData = getTeams(team1, team2);
</script>

<div class="container mx-auto flex justify-center flex-col gap-6">
	<div class="flex flex-col md:flex-row gap-4 mx-auto">
		<div class="flex flex-col gap-2">
			<label for="team1">Team 1</label>
			<select id="team1" class="select select-bordered w-full max-w-xs" bind:value={team1}>
				<option disabled selected>Select first team</option>
				{#each items as item}
					<option disabled={team2 === item.value} value={item.value}>{item.label}</option>
				{/each}
			</select>
		</div>
		<div class="flex flex-col gap-2">
			<label for="team2">Team 2</label>
			<select id="team2" class="select select-bordered w-full max-w-xs" bind:value={team2}>
				<option disabled selected>Select second team</option>

				{#each items as item}
					<option disabled={team1 === item.value} value={item.value}>{item.label}</option>
				{/each}
			</select>
		</div>
	</div>

	<Tabs {selectedId}>
		<TabList>
			<Tab tooltip="Overview between the two teams" id="h2h">H2H Comparison</Tab>
			<Tab tooltip="Qualification times for each team per circuit" id="quali">Quali Data</Tab>
			<Tab tooltip="Average race pace times for each team per circuit" id="race">Race Data</Tab>
		</TabList>

		<TabPanel id="h2h">
			{#if team1 !== undefined && team2 !== undefined && team1 !== 'Select first team' && team2 !== 'Select second team'}
				<ComparisonTeam
					qualiData={data.teamsQualiPace.values}
					raceData={data.teamsRacePace.values}
					{teamsData}
				/>
			{:else}
				<h2 class="p-4">Please select two teams to compare</h2>
			{/if}
		</TabPanel>

		<TabPanel id="quali">
			{#if team1 !== undefined && team2 !== undefined && team1 !== 'Select first team' && team2 !== 'Select second team'}
				<ComparisonTeamRace {teamsData} teamsRaceData={data.teamsQualiPace.values} />{:else}
				<h2 class="p-4">Please select two teams to compare</h2>
			{/if}
		</TabPanel>

		<TabPanel id="race">
			{#if team1 !== undefined && team2 !== undefined && team1 !== 'Select first team' && team2 !== 'Select second team'}
				<ComparisonTeamRace type="race" {teamsData} teamsRaceData={data.teamsRacePace.values} />
			{:else}
				<h2 class="p-4">Please select two teams to compare</h2>
			{/if}
		</TabPanel>
	</Tabs>
</div>
