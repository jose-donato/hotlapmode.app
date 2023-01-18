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

<div class="absolute top-2 right-2 flex gap-2">
	<button
		class="_icon-btn z-10"
		on:click={() => {
			const csv = h2hQualiData
				.filter((row) => row.Circuit !== 'TOTAL')
				.map((row) => {
					return [row.Circuit, row.driver1, row.driver2, row.Difference].join(',');
				})
				.join('\n');

			const headers = ['Circuit', driver1, driver2, 'Difference'].join(',');
			const csvWithHeaders = [headers, csv].join('\n');
			const blob = new Blob([csvWithHeaders], { type: 'text/csv' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `${driver1}-${driver2}-quali.csv`;
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

<div class="grid lg:grid-cols-2 w-full gap-2">
	<Table columns={['Circuit', 'Driver1', 'Driver2', 'Difference']} rows={h2hQualiData} />
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
