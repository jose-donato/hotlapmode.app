<script lang="ts">
	import { getAllDriverData } from '$lib/client/stats';
	import Driver from './Driver.svelte';

	export let qualiData;
	export let raceData;
	export let h2h;
	export let driversData;

	$: data = getAllDriverData(qualiData, raceData, driversData, h2h);

	//TODO: convert document.getElementById to a ref
</script>

<div class="my-8">
	<div class="flex gap-4 items-center justify-between bg-base-300/80" id="comparison">
		<Driver
			qualiPaceDriver={data.qualiDataValues.driver1}
			racePaceDriver={data.raceDataValues.driver1}
			driver={driversData.driver1Data}
		/>
		<div class="lg:mx-10">
			<img src="images/logo.webp" alt="logo" class="z-10 w-56 object-cover" />
			<div
				class="text-center uppercase text-sm lg:text-xl font-bold space-y-2 mt-[5.4rem] 2sm:mt-16 sm:mt-9 lg:mt-10"
			>
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
			qualiPaceDriver={data.qualiDataValues.driver2}
			racePaceDriver={data.raceDataValues.driver2}
			driver={driversData.driver2Data}
		/>
	</div>
</div>
