<script>
	import Card from '../../components/card.svelte';
	import Chart from '../../components/chart.svelte';
	import Table from '../../components/table.svelte';
	import { getTeamQualiValues } from '../../utils/quali';

	/** @type {import('./$types').PageData} */
	export let data;

	let circuits = data.quali.values.map((q) => q.Circuit);

	circuits = circuits.slice(0, circuits.length - 1);

	console.log(data);

	let team1 = data.teams.values[0].Team;
	let team2 = data.teams.values[1].Team;

	let team1Found = null,
		team2Found = null,
		h2hRaceData = null,
		h2hQualiData = null;

	$: {
		const team1Drivers = data.drivers.values
			.filter((driver) => driver.Team === team1)
			.map((driver) => driver.Driver);
		const team2Drivers = data.drivers.values
			.filter((driver) => driver.Team === team2)
			.map((driver) => driver.Driver);
		team1Found = {
			teamData: data.teams.values.find((team) => team.Team === team1),
			teamDrivers: team1Drivers,
			qualiValues: getTeamQualiValues(data.quali.values, team1Drivers),
			raceValues: getTeamQualiValues(data.race.values, team1Drivers)
		};
		team2Found = {
			teamData: data.teams.values.find((team) => team.Team === team2),
			teamDrivers: team2Drivers,
			qualiValues: getTeamQualiValues(data.quali.values, team2Drivers),
			raceValues: getTeamQualiValues(data.race.values, team2Drivers)
		};
		h2hRaceData = circuits.map((circuit) => {
			const team1Laptime = team1Found?.raceValues[circuit];
			const team2Laptime = team2Found?.raceValues[circuit];
			const difference =
				team1Laptime > 0 && team2Laptime > 0 ? (team1Laptime / team2Laptime - 1) * 100 : '0';
			return {
				Circuit: circuit,
				Team1: {
					value: team1Found?.raceValues[circuit],
					color: typeof difference === 'number' ? (difference < 0 ? 'green' : 'red') : 'grey'
				},
				Team2: {
					value: team2Found?.raceValues[circuit],
					color: typeof difference === 'number' ? (difference > 0 ? 'green' : 'red') : 'grey'
				},
				differenceValue: difference,
				Difference: typeof difference === 'number' ? `${difference.toFixed(2)}%` : difference
			};
		});
		h2hQualiData = circuits.map((circuit) => {
			const team1Laptime = team1Found?.qualiValues[circuit];
			const team2Laptime = team2Found?.qualiValues[circuit];
			const difference =
				team1Laptime > 0 && team2Laptime > 0 ? (team1Laptime / team2Laptime - 1) * 100 : '-';
			return {
				Circuit: circuit,
				Team1: {
					value: team1Found?.qualiValues[circuit],
					color: typeof difference === 'number' ? (difference < 0 ? 'green' : 'red') : 'grey'
				},
				differenceValue: difference,
				Team2: {
					value: team2Found?.qualiValues[circuit],
					color: typeof difference === 'number' ? (difference > 0 ? 'green' : 'red') : 'grey'
				},
				Difference: typeof difference === 'number' ? `${difference.toFixed(2)}%` : difference
			};
		});
	}
</script>

<div class="container mx-auto py-10">
	<h2 class="uppercase font-bold tracking-widest mb-2 text-center">H2H Quali Performances</h2>
	<div class="flex flex-col md:flex-row justify-center mb-4 gap-2">
		<div class="flex flex-col gap-2 card p-4 w-full md:w-80">
			<label for="team1">Team 1</label>
			<select id="team1" bind:value={team1}>
				{#each data.teams.values as team}
					<option value={team.Team}>{team.Team}</option>
				{/each}
			</select>
			{#if team1Found}
				<div class="flex gap-4 justify-between">
					<div class="flex flex-col text-sm w-2/3">
						<div>
							<strong>Full Name:</strong>
							{team1Found?.teamData['Full Team Name']}
						</div>
						<div>
							<strong>Age:</strong>
							{team1Found?.teamData.Age}
						</div>
						<div>
							<strong>Lineup:</strong>
							{team1Found?.teamDrivers.join(', ')}
						</div>
					</div>
					<img
						src={team1Found?.teamData['Team Logo']}
						alt={team1}
						class="w-20 h-20 object-contain"
					/>
				</div>
			{/if}
		</div>
		<div class="flex flex-col gap-2 card p-4 w-full md:w-80">
			<label for="team2">Team 2</label>
			<select id="team2" bind:value={team2}>
				{#each data.teams.values as team}
					<option value={team.Team}>{team.Team}</option>
				{/each}
			</select>
			{#if team2Found}
				<div class="flex gap-4 justify-between">
					<div class="flex flex-col text-sm w-2/3">
						<div>
							<strong>Full Name:</strong>
							{team2Found?.teamData['Full Team Name']}
						</div>
						<div>
							<strong>Age:</strong>
							{team2Found?.teamData.Age}
						</div>
						<div>
							<strong>Lineup:</strong>
							{team2Found?.teamDrivers.join(', ')}
						</div>
					</div>
					<img
						src={team2Found?.teamData['Team Logo']}
						alt={team2}
						class="w-20 h-20 object-contain"
					/>
				</div>
			{/if}
		</div>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
		<Card title="Quali Lap Times">
			<Table columns={['Circuit', 'Team1', 'Team2', 'Difference']} rows={h2hQualiData} />
		</Card>
		<Card title="Avg Race Pace">
			<Table columns={['Circuit', 'Team1', 'Team2', 'Difference']} rows={h2hRaceData} />
		</Card>
		<Chart
			data={{
				labels: circuits,
				datasets: [
					{
						values: h2hQualiData ? h2hQualiData.map((row) => row.differenceValue) : []
					}
				]
			}}
		/>
		<Chart
			data={{
				labels: circuits,
				datasets: [
					{
						values: h2hRaceData ? h2hRaceData.map((row) => row.differenceValue) : []
					}
				]
			}}
		/>
	</div>
</div>
