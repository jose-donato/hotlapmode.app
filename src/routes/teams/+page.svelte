<script lang="ts">
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	import { page } from '$app/stores';
	import { toPng } from 'html-to-image';

	import Tabs from '$lib/ui/Tabs/Tabs.svelte';
	import TabList from '$lib/ui/Tabs/TabList.svelte';
	import Tab from '$lib/ui/Tabs/Tab.svelte';
	import TabPanel from '$lib/ui/Tabs/TabPanel.svelte';
	import ComparisonTeam from '$lib/ui/ComparisonTeam.svelte';
	import ComparisonTeamRace from '$lib/ui/ComparisonTeamRace.svelte';
	import { fade } from 'svelte/transition';
	import Chart from '$lib/ui/Chart.svelte';
	const paramLineup = $page.url.searchParams.get('lineup');
	let lineup = paramLineup ? paramLineup.split('_') : [];
	let items = data.teams.values.map((team) => ({
		value: team.Team,
		label: team.Team
	}));

	const circuits = data.teamsRacePace.values.map((q) => q.Circuit);
	const teams = data.teamsRacePace.headerValues.slice(1);
	console.log(teams);

	let team1: string = items.find((item) => item.value === lineup[0])?.value || 'Select first team';
	let team2: string = items.find((item) => item.value === lineup[1])?.value || 'Select second team';

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

	function clearTeams() {
		team1 = 'Select first team';
		team2 = 'Select second team';
	}

	console.log(data);

	const colors = {
		'Red Bull': '#0600ef',
		Mercedes: '#00d2be',
		McLaren: '#ff8700',
		Ferrari: '#dc0000',
		AlphaTauri: '#2b4562',
		Alpine: '#0090ff',
		Williams: '#005aff',
		Haas: '#ffffff',
		'Alfa Romeo': '#900000',
		'Aston Martin': '#006f62'
	};
</script>

<svelte:head>
	<meta name="og:image" content={`https://hotlapmode.app/og?lineup=${team1}_${team2}&type=teams`} />
</svelte:head>

<div class="container mx-auto flex justify-center flex-col gap-6">
	<div class="flex flex-col md:flex-row gap-4 mx-auto w-full lg:w-[405px]">
		<div class="flex flex-col gap-2 lg:w-1/2">
			<label for="team1">Team 1</label>
			<select id="team1" class="select select-bordered w-full lg:max-w-xs" bind:value={team1}>
				<option disabled selected>Select first team</option>
				{#each items as item}
					<option disabled={team2 === item.value} value={item.value}>{item.label}</option>
				{/each}
			</select>
		</div>
		<div class="flex flex-col gap-2 lg:w-1/2">
			<label for="team2">Team 2</label>
			<select id="team2" class="select select-bordered w-full lg:max-w-xs" bind:value={team2}>
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
				<div class="text-center py-4 space-y-2">
					<h2>Select two teams from the boxes above</h2>
					<p class="text-sm">
						You will be able to see an overall comparison between them, and more detailed Quali/Race
						comparisons.
					</p>
					<p class="text-sm -mt-2">
						If you want to compare drivers instead change to <a href="/" class="link"
							>drivers page</a
						>
					</p>
				</div>
			{/if}
		</TabPanel>

		<TabPanel id="quali">
			{#if team1 !== undefined && team2 !== undefined && team1 !== 'Select first team' && team2 !== 'Select second team'}
				{#key teamsData}
					<ComparisonTeamRace {teamsData} teamsRaceData={data.teamsQualiPace.values} />
				{/key}
			{:else}
				<div class="text-center py-4 space-y-2">
					<h2>Select two teams from the boxes above</h2>
					<p class="text-sm">
						You will be able to see an overall comparison between them, and more detailed Quali/Race
						comparisons.
					</p>
					<p class="text-sm -mt-2">
						If you want to compare drivers instead change to <a href="/" class="link"
							>drivers page</a
						>
					</p>
				</div>
			{/if}
		</TabPanel>

		<TabPanel id="race">
			{#if team1 !== undefined && team2 !== undefined && team1 !== 'Select first team' && team2 !== 'Select second team'}
				{#key teamsData}
					<ComparisonTeamRace type="race" {teamsData} teamsRaceData={data.teamsRacePace.values} />
				{/key}
			{:else}
				<div class="text-center py-4 space-y-2">
					<h2>Select two teams from the boxes above</h2>
					<p class="text-sm">
						You will be able to see an overall comparison between them, and more detailed Quali/Race
						comparisons.
					</p>
					<p class="text-sm -mt-2">
						If you want to compare drivers instead change to <a href="/" class="link"
							>drivers page</a
						>
					</p>
				</div>
			{/if}
		</TabPanel>
	</Tabs>
	{#if team1 !== undefined && team2 !== undefined && team1 !== 'Select first team' && team2 !== 'Select second team'}
		<div transition:fade class="flex gap-4 justify-center">
			<button
				class="btn gap-2 w-fit bg-base-300"
				on:click={() =>
					toPng(document.getElementById('comparison'), { cacheBust: true })
						.then((dataUrl) => {
							const link = document.createElement('a');
							link.download = `comparison-${team1}-${team2}.png`;
							link.href = dataUrl;
							link.click();
							link.remove();
						})
						.catch((err) => {
							console.log(err);
						})}
			>
				Download <svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-6 h-6"
				>
					<path
						fill-rule="evenodd"
						d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
			<button
				class="btn gap-2 w-fit bg-base-300"
				on:click={() => {
					const url = `https://hotlapmode.app/teams?lineup=${team1}_${team2}`.replaceAll(
						' ',
						'%20'
					);
					if (
						/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
							navigator.userAgent
						)
					) {
						if (navigator.share) {
							navigator.share({
								title: `hotlapmode - team comparison`,
								text: `Check out the F1 2022 team comparison between ${team1} and ${team2}`,
								url
							});
							return;
						}
					}
					window.open(
						encodeURI(
							`https://twitter.com/intent/tweet?text=Check out the F1 2022 team comparison between ${team1} and ${team2}&url=${url}`
						),
						'_blank'
					);
				}}
			>
				Share <svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-6 h-6"
				>
					<path
						fill-rule="evenodd"
						d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
			<button on:click={clearTeams} class="btn gap-2 w-fit bg-base-300">
				Clear
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-6 h-6"
				>
					<path
						fill-rule="evenodd"
						d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
		</div>
	{/if}
</div>

<Chart
	yLabel="Lap time (s)"
	data={{
		labels: circuits,
		datasets: teams.map((team) => {
			return {
				label: team,
				data: data.teamsRacePace.values.map((teamData) => {
					return parseFloat(teamData[team]);
				}),
				backgroundColor: colors[team],
				borderColor: colors[team],
				borderWidth: 1
			};
		})
	}}
/>
