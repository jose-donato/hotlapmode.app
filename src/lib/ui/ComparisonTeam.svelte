<script lang="ts">
	import { compareValues, getDriverValues } from '$lib/client/stats';
	import Export from './Export.svelte';
	import Team from './Team.svelte';
	import { toPng } from 'html-to-image';

	export let team1Data;
	export let team2Data;

	/*const qualiDrivers = getDriverValues(qualiData, driver1, driver2);
	const qualiDriverValues = compareValues(
		qualiDrivers[0],
		qualiDrivers[1],
		qualiDrivers[2],
		driver1,
		driver2
	);
	const raceDrivers = getDriverValues(raceData, driver1, driver2);
	const raceDriverValues = compareValues(
		raceDrivers[0],
		raceDrivers[1],
		qualiDrivers[2],
		driver1,
		driver2
	);*/
</script>

<div class="p-4">
	<Export
		downloadCsvFn={() => {}}
		downloadImgFn={() =>
			toPng(document.getElementById('comparison'), { cacheBust: true })
				.then((dataUrl) => {
					const link = document.createElement('a');
					link.download = 'comparison.png';
					link.href = dataUrl;
					link.click();
				})
				.catch((err) => {
					console.log(err);
				})}
	/>
	<div class="flex gap-4 items-center justify-between">
		<Team team={team1Data} />
		<div class="lg:mx-10">
			<img src="images/logo.webp" alt="logo" class="z-10 w-56 object-cover" />
			<div class="text-center uppercase text-sm lg:text-xl font-bold space-y-2 mt-20 lg:mt-10">
				<!--<p>Quali Pace</p>
			<p>H2H Quali</p>
			<p>Race Pace</p>
			<p>H2H Race</p>-->
				<p>Wins</p>
				<p>Position</p>
				<p>Points</p>
			</div>
		</div>
		<Team team={team2Data} />
	</div>
</div>
