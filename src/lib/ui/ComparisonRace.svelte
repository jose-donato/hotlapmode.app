<script lang="ts">
	import { getDriverValues } from '$lib/client/stats';
	import Chart from './Chart.svelte';
	import Table from './Table.svelte';

	export let raceData;
	export let driversData;
	export let type = 'quali';
	const circuits = raceData.map((q) => q.Circuit);
	const driver1Name = driversData.driver1Data.Driver;
	const driver2Name = driversData.driver2Data.Driver;

	function getH2HQualiData(data, driver1, driver2) {
		const qualiDrivers = getDriverValues(data, driver1, driver2);
		//const qualiDriverValues = compareValues(qualiDrivers[0], qualiDrivers[1]);

		const h2hQualiData = circuits.map((circuit) => {
			const driver1Laptime = qualiDrivers[0][circuit];
			const driver2Laptime = qualiDrivers[1][circuit];
			const difference =
				driver1Laptime > 0 && driver2Laptime > 0
					? (driver1Laptime / driver2Laptime - 1) * 100
					: '-';

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
		return h2hQualiData;
	}

	$: h2hQualiData = getH2HQualiData(raceData, driver1Name, driver2Name);
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 w-full" id="comparison">
	<Table columns={['Circuit', driver1Name, driver2Name, 'Difference']} rows={h2hQualiData} />
	<Chart
		info={type === 'race'
			? 'Values calculated through FastF1 with an automized code for all drivers. Negative value means left driver was faster.'
			: 'Values calculated through comparison with teammate in last Q session both took part in. Negative value means left driver was faster.'}
		data={{
			labels: circuits,
			datasets: [
				{
					lineTension: 0.3,
					backgroundColor: '#dc2626',
					borderColor: '#dc2626',
					borderCapStyle: 'butt',
					pointBackgroundColor: '#fff',
					label: `${driver1Name} vs ${driver2Name} - ${type} % Difference`,
					data: h2hQualiData ? h2hQualiData.map((row) => row.differenceValue) : []
				}
			]
		}}
	/>
</div>
