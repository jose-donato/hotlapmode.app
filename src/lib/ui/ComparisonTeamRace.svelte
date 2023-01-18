<script>
	import { getDriverValues } from '$lib/client/stats';
	import Chart from './Chart.svelte';
	import Table from './Table.svelte';
	export let team1;
	export let team2;
	export let teamsData;
	const circuits = teamsData.map((q) => q.Circuit);

	const qualiDrivers = getDriverValues(teamsData, team1.value, team2.value);
	//const qualiDriverValues = compareValues(qualiDrivers[0], qualiDrivers[1]);

	const h2hQualiData = circuits.map((circuit) => {
		const driver1Laptime = qualiDrivers[0][circuit];
		const driver2Laptime = qualiDrivers[1][circuit];
		const difference =
			driver1Laptime > 0 && driver2Laptime > 0 ? (driver1Laptime / driver2Laptime - 1) * 100 : '-';

		return {
			Circuit: circuit,
			Team1: {
				value: driver1Laptime,
				color: typeof difference === 'number' ? (difference < 0 ? 'green' : 'red') : 'grey'
			},
			differenceValue: difference,
			Team2: {
				value: driver2Laptime,
				color: typeof difference === 'number' ? (difference > 0 ? 'green' : 'red') : 'grey'
			},
			Difference: typeof difference === 'number' ? `${difference.toFixed(2)}%` : difference
		};
	});
</script>

<div class="absolute top-2 right-2 flex gap-2">
	<button
		class="_icon-btn z-10"
		on:click={() => {
			const csv = h2hQualiData
				.filter((row) => row.Circuit !== 'TOTAL')
				.map((row) => {
					return [row.Circuit, row.Driver1.value, row.Driver2.value, row.Difference].join(',');
				})
				.join('\n');

			const headers = ['Circuit', team1.value, team2.value, 'Difference'].join(',');
			const csvWithHeaders = [headers, csv].join('\n');
			const blob = new Blob([csvWithHeaders], { type: 'text/csv' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `${team1.value}-${team2.value}-race.csv`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width={1.5}
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
			/>
		</svg>
	</button>
</div>

<div class="grid grid-cols-2 w-full gap-2">
	<Table columns={['Circuit', 'Team1', 'Team2', 'Difference']} rows={h2hQualiData} />
	<Chart
		info="Values obtained through the pace of the best driver for every team"
		info2="Quali Values obtained through the best sector times of the best driver for every team"
		data={{
			labels: circuits,
			datasets: [
				{
					values: h2hQualiData ? h2hQualiData.map((row) => row.differenceValue) : []
				}
			]
		}}
	/>
</div>
