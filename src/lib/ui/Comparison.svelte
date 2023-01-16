<script lang="ts">
	import { compareValues, getDriverValues } from '$lib/client/stats';
	import Driver from './Driver.svelte';

	export let driver1: string;
	export let driver2: string;

	export let driversData;
	export let qualiData;
	export let raceData;

	const getDrivers = (driver1: string, driver2: string) => {
		const drivers = driversData.filter((driver) => {
			return driver.Driver === driver1 || driver.Driver === driver2;
		});

		let driver1Data = drivers[0];
		let driver2Data = drivers[1];

		// get "HLM Rating" and compare between drivers
		let driver1HLM = parseFloat(driver1Data['HLM Rating']);
		let driver2HLM = parseFloat(driver2Data['HLM Rating']);
		let driver1Media = parseFloat(driver1Data['Media Rating']);
		let driver2Media = parseFloat(driver2Data['Media Rating']);
		console.log(driver2Data);
		driver1Data = {
			...driver1Data,
			hlmRating: {
				value: driver1HLM,
				diff: driver1HLM - driver2HLM
			},
			mediaRating: {
				value: driver1Media,
				diff: driver1Media - driver2Media
			},
			points: {
				value: driver1Data['points'],
				diff: driver1Data['points'] - driver2Data['points']
			},
			wins: {
				value: driver1Data['wins'],
				diff: driver1Data['wins'] - driver2Data['wins']
			},
			position: {
				value: driver1Data['position'],
				diff: driver2Data['position'] - driver1Data['position']
			}
		};

		driver2Data = {
			...driver2Data,
			hlmRating: {
				value: driver2HLM,
				diff: driver2HLM - driver1HLM
			},
			mediaRating: {
				value: driver2Media,
				diff: driver2Media - driver1Media
			},
			points: {
				value: driver2Data['points'],
				diff: driver2Data['points'] - driver1Data['points'].value
			},
			wins: {
				value: driver2Data['wins'],
				diff: driver2Data['wins'] - driver1Data['wins'].value
			},
			position: {
				value: driver2Data['position'],
				diff: driver1Data['position'].value - driver2Data['position']
			}
		};

		return { driver1Data, driver2Data };
	};

	const { driver1Data, driver2Data } = getDrivers(driver1, driver2);

	const sameTeamDriver = driver1Data.Team === driver2Data.Team;

	const qualiDrivers = getDriverValues(qualiData, driver1, driver2);
	const qualiDriverValues = compareValues(qualiDrivers[0], qualiDrivers[1]);
	const raceDrivers = getDriverValues(raceData, driver1, driver2);
	const raceDriverValues = compareValues(raceDrivers[0], raceDrivers[1]);
</script>

<div class="absolute top-2 right-2 flex gap-2">
	{#if !sameTeamDriver}
		<div
			class="tooltip"
			data-tip="Drivers are not from the same team. Some pace averages for Qualifying or Race
	could be not accurate for comparison"
		>
			<div class="btn btn-square">
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
						d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
					/>
				</svg>
			</div>
		</div>
	{/if}
	<button class="btn btn-square">
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
<div class="flex mx-auto">
	<Driver
		driverType="Driver 1"
		racePace={raceDriverValues}
		qualiPace={qualiDriverValues}
		driver={driver1Data}
	/>
	<div class="mx-10">
		<div class="flex gap-10">
			<img src={driver1Data.Image} class="w-20 h-20 object-cover" alt="driver 1" />
			<div class="h-20 flex items-center justify-center flex-col">
				<h1 class="text-center text-xl font-bold tracking-wide">hotlapmode.app</h1>
				<h2 class="text-center">developed by jose-donato</h2>
			</div>
			<img src={driver2Data.Image} class="w-20 h-20 object-cover" alt="driver 2" />
		</div>
		<div class="text-center uppercase text-xl font-bold space-y-2">
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
		driverType="Driver 2"
		racePace={raceDriverValues}
		qualiPace={qualiDriverValues}
		driver={driver2Data}
	/>
</div>
