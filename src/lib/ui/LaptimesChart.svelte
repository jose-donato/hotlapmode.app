<script lang="ts">
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
					text: 'Lap number',
					color: '#D3D3D3'
				}
			},
			y: {
				ticks: {
					color: '#D3D3D3'
				},
				title: {
					display: true,
					text: 'Laptime (s)',
					color: '#D3D3D3'
				}
			}
		}
	};

	export let data;
</script>

<Line {data} options={chartOptions} />
