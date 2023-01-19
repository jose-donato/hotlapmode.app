<script lang="ts">
	import Chart from 'svelte-frappe-charts';
	import { toPng } from 'html-to-image';
	import Export from './Export.svelte';

	export let data;
	export let info: string;
</script>

<div class="relative">
	<Export
		downloadCsvFn={() => {
			const csv = data.datasets.map((dataset) => {
				const csvData = dataset.values.map((value, index) => {
					return `${data.labels[index]},${value}`;
				});
				return csvData.join('\n');
			});
			const blob = new Blob([csv], { type: 'text/csv' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `table.csv`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}}
		downloadImgFn={() =>
			toPng(document.getElementById('chart'), { cacheBust: true })
				.then((dataUrl) => {
					const link = document.createElement('a');
					link.download = 'chart.png';
					link.href = dataUrl;
					link.click();
				})
				.catch((err) => {
					console.log(err);
				})}
	/>
	<div id="chart">
		<p class="uppercase mt-1 ml-4 font-bold">Difference</p>
		<Chart
			{data}
			type="line"
			tooltipOptions={{
				formatTooltipX: (d) => (d + '').toUpperCase(),
				formatTooltipY: (d) => (d && typeof d === 'number' ? d.toFixed(2) + '%' : d)
			}}
		/>
	</div>
	<div class="alert shadow-lg mt-4">
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="stroke-info flex-shrink-0 w-6 h-6"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<span>{info}</span>
		</div>
	</div>
</div>
