<script lang="ts">
	import LaptimesChart from '$lib/ui/LaptimesChart.svelte';
	import clsx from 'clsx';
	import type { PageServerData } from './$types';
	export let data: PageServerData;

	const options = [
		{
			label: '5',
			value: 5
		},
		{
			label: '10',
			value: 10
		},
		{
			label: '15',
			value: 15
		},
		{
			label: '20',
			value: 20
		}
	];

	let selectedOption = 20;
	let removeOutliersSelected = false;

	function removeOutliers(arr: number[]) {
		const values = arr.concat();
		values.sort((a, b) => a - b);
		const q1 = values[Math.floor(values.length / 4)];
		const q3 = values[Math.ceil(values.length * (3 / 4))];
		const iqr = q3 - q1;
		const maxValue = q3 + iqr * 1.5;
		const minValue = q1 - iqr * 1.5;
		return arr.filter((x) => x <= maxValue && x >= minValue);
	}

	$: chartData = {
		labels: data.laptimes.map((lap) => lap.number),
		datasets: data.raceData.Results.slice(0, selectedOption).map((result) => {
			const color = generateRandomRGBA('1');
			return {
				label: result.Driver.givenName + ' ' + result.Driver.familyName,
				data: removeOutliersSelected ? removeOutliers(result.laptimes) : result.laptimes,
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
		<div class="flex gap-4">
			<div class="w-[80%]">
				<LaptimesChart data={chartData} />
			</div>
			<div>
				<p class="mb-2">Options</p>
				<div class="flex flex-col gap-2">
					<div class="flex gap-2">
						<label for="select">Select number of drivers</label>
						<select id="select" bind:value={selectedOption} class="form-select">
							{#each options as option}
								<option value={option.value}>{option.label}</option>
							{/each}
						</select>
					</div>
					<div class="flex gap-2">
						<label for="outliers">Remove outliers</label>
						<input id="outliers" type="checkbox" bind:checked={removeOutliersSelected} />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
