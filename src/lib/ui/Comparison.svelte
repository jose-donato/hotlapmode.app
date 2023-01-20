<script lang="ts">
	import { compareDriverValues, compareValues, getDriverValues } from '$lib/client/stats';
	import Driver from './Driver.svelte';
	import Export from './Export.svelte';
	import { toPng } from 'html-to-image';

	export let qualiData;
	export let raceData;
	export let h2h;
	export let driversData;

	$: qualiDriverValues = compareDriverValues(
		qualiData,
		driversData.driver1Data.Driver,
		driversData.driver2Data.Driver,
		driversData.sameTeamDriver,
		h2h,
		'Quali'
	);
	$: raceDriverValues = compareDriverValues(
		raceData,
		driversData.driver1Data.Driver,
		driversData.driver2Data.Driver,
		driversData.sameTeamDriver,
		h2h,
		'Race'
	);

	//TODO: convert document.getElementById to a ref
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
	<div class="flex gap-4 items-center justify-between" id="comparison">
		<Driver
			qualiPaceDriver={qualiDriverValues.driver1}
			racePaceDriver={raceDriverValues.driver1}
			driver={driversData.driver1Data}
		/>
		<div class="lg:mx-10">
			<img src="images/logo.webp" alt="logo" class="z-10 w-56 object-cover" />
			<div class="text-center uppercase text-sm lg:text-xl font-bold space-y-2 mt-20 lg:mt-10">
				<p>Media Rating</p>
				<p>HLM Rating</p>
				<p>Quali Pace</p>
				<p>H2H Quali</p>
				<p>Race Pace</p>
				<p>H2H Race</p>
				<p>DNF's</p>
				<p>Wins</p>
				<p>Position</p>
				<p>Points</p>
			</div>
		</div>
		<Driver
			qualiPaceDriver={qualiDriverValues.driver2}
			racePaceDriver={raceDriverValues.driver2}
			driver={driversData.driver2Data}
		/>
	</div>
</div>
