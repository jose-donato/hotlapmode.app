<script lang="ts">
	import LaptimesChart from '$lib/ui/LaptimesChart.svelte';
	import clsx from 'clsx';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	console.log(data);

	let chartData = {
		labels: data.laptimes.map((lap) => lap.number),
		datasets: data.raceData.Results.map((result) => {
			const color = generateRandomRGBA('1');
			return {
				label: result.Driver.givenName + ' ' + result.Driver.familyName,
				data: result.laptimes,
				backgroundColor: color,
				borderColor: color,
				borderWidth: 1,
				fill: false
			};
		})
	};

	function generateRandomRGBA(opacity: string) {
		let o = Math.round,
			r = Math.random,
			s = 255;
		return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ', ' + opacity + ')';
	}
</script>

<div class="flex flex-col m-10 gap-10">
	<div class="flex justify-center gap-10">
		<div class="">
			<p class="mb-2">Race info</p>
			<p class="">{data.raceData.raceName}</p>
			<p class="">{data.raceData.Circuit.circuitName}</p>
			<p class="">{data.raceData.Circuit.Location.locality}</p>
			<p class="">{data.raceData.Circuit.Location.country}</p>
			<p class="">{data.raceData.date}</p>
			<a class="link" href={data.raceData.url} target="_blank" rel="noopener noreferrer">See more</a
			>
		</div>
		<div>
			<p class="mb-2">Results</p>
			<div class="max-h-[200px] overflow-auto">
				<table class="table table-compact table-zebra">
					<thead class="sticky top-0">
						<tr>
							<th>Position</th>
							<th>Driver</th>
							<th>Time</th>
							<th>Points</th>
						</tr>
					</thead>
					<tbody>
						{#each data.raceData.Results as result}
							<tr>
								<td>{result.position}</td>
								<td>{result.Driver.givenName} {result.Driver.familyName}</td>
								<td>{result.Time?.time ?? '-'}</td>
								<td>{result.points}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<div>
		<p class="mb-2 text-center">Lap times</p>
		<LaptimesChart data={chartData} />
	</div>
</div>
