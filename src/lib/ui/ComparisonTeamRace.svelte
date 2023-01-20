<script>
	import { getTeamValues } from '$lib/client/stats';
	import Chart from './Chart.svelte';
	import Table from './Table.svelte';
	export let type = 'quali';
	export let teamsRaceData;
	export let teamsData;
	const circuits = teamsRaceData.map((q) => q.Circuit);

	const team1 = teamsData.team1Data.Team;
	const team2 = teamsData.team2Data.Team;

	const qualiDrivers = getTeamValues(teamsRaceData, team1, team2);

	const h2hQualiData = circuits.map((circuit) => {
		const driver1Laptime = qualiDrivers[0][circuit];
		const driver2Laptime = qualiDrivers[1][circuit];
		const difference =
			driver1Laptime > 0 && driver2Laptime > 0 ? (driver1Laptime / driver2Laptime - 1) * 100 : '-';

		const data = {
			Circuit: circuit,
			differenceValue: difference,
			Difference: typeof difference === 'number' ? `${difference.toFixed(2)}%` : difference
		};
		data[team1] = {
			value: driver1Laptime,
			color: typeof difference === 'number' ? (difference < 0 ? 'green' : 'red') : 'grey'
		};

		data[team2] = {
			value: driver2Laptime,
			color: typeof difference === 'number' ? (difference > 0 ? 'green' : 'red') : 'grey'
		};
		return data;
	});
</script>

<div class="grid lg:grid-cols-2 w-full gap-2">
	<Table columns={['Circuit', team1, team2, 'Difference']} rows={h2hQualiData} />
	<Chart
		info={type === 'race'
			? 'Values obtained through the pace of the best driver for every team. Negative values mean left team was faster'
			: 'Quali Values obtained through the best sector times of the best driver for every team. Negative values mean left team was faster'}
		data={{
			labels: circuits,
			datasets: [
				{
					fill: true,
					lineTension: 0.3,
					backgroundColor: '#F28C18',
					borderColor: '#F28C18',
					borderCapStyle: 'butt',
					pointBackgroundColor: '#fff',
					label: `${team1} vs ${team2} - ${type} % Difference`,
					data: h2hQualiData ? h2hQualiData.map((row) => row.differenceValue) : []
				}
			]
		}}
	/>
</div>
