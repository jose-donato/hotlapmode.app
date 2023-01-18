<script lang="ts">
	import { compareValues, getDriverValues } from '$lib/client/stats';
	import Driver from './Driver.svelte';

	export let driver1: string;
	export let driver2: string;

	export let qualiData;
	export let raceData;
	export let sameTeamDriver: string;
	export let driver1Data;
	export let driver2Data;

	const qualiDrivers = getDriverValues(qualiData, driver1, driver2);
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
	);
</script>

<div class="absolute top-2 right-2 flex gap-2">
	<button class="_icon-btn">
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
				d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
			/>
		</svg>
	</button>
</div>
<div class="flex gap-4 items-center justify-between">
	<Driver
		qualiPaceDriver={qualiDriverValues.driver1}
		racePaceDriver={raceDriverValues.driver1}
		driver={driver1Data}
	/>
	<div class="lg:mx-10">
		<div class="h-20 flex items-center justify-center flex-col pt-20">
			<a
				href="/"
				class="lowercase font-bold btn btn-ghost text-xl relative text-transparent bg-clip-text bg-gradient-to-r from-white to-primary"
			>
				hotlapmode.app
			</a>
			<h2 class="text-center text-xs lg:text-base">
				developed by <a
					target="_blank"
					rel="noopener noreferrer"
					class="underline"
					href="https://twitter.com/josedonato__"
				>
					@jose-donato
				</a>
			</h2>
		</div>
		<div class="text-center uppercase text-sm lg:text-xl font-bold space-y-2 mt-20 lg:mt-20">
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
		driver={driver2Data}
	/>
</div>
