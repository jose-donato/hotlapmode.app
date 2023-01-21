<script context="module" lang="ts">
	import { Line } from 'svelte-chartjs';
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

	//import * as annotationPlugin from 'chartjs-plugin-annotation';

	ChartJS.register(
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale
		//annotationPlugin
	);

	let chartOptions: ChartOptions<'line'> = {
		responsive: true,
		plugins: {
			legend: {
				labels: {
					color: '#D3D3D3'
				}
			} /*
			annotation: {
				annotations: {
					line1: {
						type: 'line',
						scaleID: 'y',
						value: 0,
						borderColor: '#D3D3D3',
						borderWidth: 2,
						label: {
							backgroundColor: '#D3D3D3',
							content: '0%',
							position: 'center'
						}
					}
				}
			}*/
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
				suggestedMin: 2,
				suggestedMax: -2,
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

<div class="flex flex-col gap-6 my-6 lg:my-0">
	<div class="mt-2">
		<Line {data} options={chartOptions} />
	</div>
	<div class="alert shadow-lg w-[80%] mx-auto">
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
