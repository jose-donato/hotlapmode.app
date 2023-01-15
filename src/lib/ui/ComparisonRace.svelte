<script>
	import { getDriverValues } from '$lib/client/stats';
	import Chart from './Chart.svelte';
	import Table from './Table.svelte';
	export let raceData;
	export let driver1;
	export let driver2;
	export let driversData;
	const circuits = raceData.map((q) => q.Circuit);

	const qualiDrivers = getDriverValues(raceData, driver1.value, driver2.value);
	//const qualiDriverValues = compareValues(qualiDrivers[0], qualiDrivers[1]);

	const h2hQualiData = circuits.map((circuit) => {
		const driver1Laptime = qualiDrivers[0][circuit];
		const driver2Laptime = qualiDrivers[1][circuit];
		const difference =
			driver1Laptime > 0 && driver2Laptime > 0 ? (driver1Laptime / driver2Laptime - 1) * 100 : '-';

		return {
			Circuit: circuit,
			Driver1: {
				value: driver1Laptime,
				color: typeof difference === 'number' ? (difference < 0 ? 'green' : 'red') : 'grey'
			},
			differenceValue: difference,
			Driver2: {
				value: driver2Laptime,
				color: typeof difference === 'number' ? (difference > 0 ? 'green' : 'red') : 'grey'
			},
			Difference: typeof difference === 'number' ? `${difference.toFixed(2)}%` : difference
		};
	});
</script>

<div class="grid grid-cols-2 w-full">
	<Table columns={['Circuit', 'Driver1', 'Driver2', 'Difference']} rows={h2hQualiData} />
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
</div>
