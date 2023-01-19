<script lang="ts">
	import { getDriverValues } from '$lib/client/stats';
	import Chart from './Chart.svelte';
	import Table from './Table.svelte';
	export let qualiData;
	export let driver1: string;
	export let driver2: string;
	export let driversData;
	const circuits = qualiData.map((q) => q.Circuit);

	const qualiDrivers = getDriverValues(qualiData, driver1, driver2);
	//const qualiDriverValues = compareValues(qualiDrivers[0], qualiDrivers[1]);

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
		data[driver1] = {
			value: driver1Laptime,
			color: typeof difference === 'number' ? (difference < 0 ? 'green' : 'red') : 'grey'
		};

		data[driver2] = {
			value: driver2Laptime,
			color: typeof difference === 'number' ? (difference > 0 ? 'green' : 'red') : 'grey'
		};

		return data;
	});
</script>

<div class="grid lg:grid-cols-2 w-full gap-2">
	<Table columns={['Circuit', driver1, driver2, 'Difference']} rows={h2hQualiData} />
	<Chart
		info="Values calculated through comparison with teammate in last Q session both took part in"
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
