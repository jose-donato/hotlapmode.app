<script lang="ts">
	import { Line } from 'svelte-chartjs';
	import { toPng } from 'html-to-image';
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale
	} from 'chart.js';
	import type { ChartOptions } from 'chart.js';

	import Export from './Export.svelte';

	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);

	let chartOptions: ChartOptions<'line'> = {
		responsive: true,
		plugins: {
			legend: {
				labels: {
					color: '#D3D3D3'
				}
			}
		},
		scales: {
			x: {
				ticks: {
					color: '#D3D3D3'
				},
				title: {
					display: true,
					text: 'Circuit',
					color: '#D3D3D3'
				}
			},
			y: {
				ticks: {
					color: '#D3D3D3'
				},
				title: {
					display: true,
					text: 'Difference in %',
					color: '#D3D3D3'
				}
			}
		}
	};

	export let data;
	export let info: string;
</script>

<div class="relative flex flex-col">
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
	<div id="chart" class="mt-2">
		<Line {data} options={chartOptions} />
	</div>
	<div class="alert shadow-lg mt-auto mb-4 w-[80%] mx-auto">
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
			<span class="text-sm">{info}</span>
		</div>
	</div>
</div>
