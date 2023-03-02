<script lang="ts">
	import { page } from '$app/stores';

	import type { PageServerData } from './$types';
	export let data: PageServerData;
	import { toPng } from 'html-to-image';

	import Comparison from '$lib/ui/Comparison.svelte';
	import Tabs, { tabContextId } from '$lib/ui/Tabs/Tabs.svelte';
	import TabList from '$lib/ui/Tabs/TabList.svelte';
	import Tab from '$lib/ui/Tabs/Tab.svelte';
	import TabPanel from '$lib/ui/Tabs/TabPanel.svelte';
	import ComparisonRace from '$lib/ui/ComparisonRace.svelte';
	import { fade } from 'svelte/transition';
	import { browser } from '$app/environment';

	const paramLineup = $page.url.searchParams.get('lineup');
	let lineup = paramLineup ? paramLineup.split('_') : [];

	let items = data.drivers.values.map((driver) => ({
		value: driver.Driver,
		label: driver['Full Name'],
		group: driver['Team']
	}));

	const groups = items.reduce((acc, item) => {
		const group = acc.find((g) => g.value === item.group);
		if (group) {
			group.items.push(item);
		} else {
			acc.push({
				value: item.group,
				label: item.group,
				items: [item]
			});
		}
		return acc;
	}, []);

	let driver1: string =
		items.find((item) => item.value === lineup[0])?.value || 'Select first driver';
	let driver2: string =
		items.find((item) => item.value === lineup[1])?.value || 'Select second driver';
	let selectedId = 'h2h';
	const getDrivers = (driver1: string, driver2: string) => {
		if (
			!(
				driver1 !== undefined &&
				driver2 !== undefined &&
				driver1 !== 'Select first driver' &&
				driver2 !== 'Select second driver'
			)
		)
			return;
		const drivers = data.drivers.values.filter((driver) => {
			return driver.Driver === driver1 || driver.Driver === driver2;
		});
		let driver1Data = drivers[0];
		let driver2Data = drivers[1];

		/*let driver1HLM = parseFloat(driver1Data['HLM Rating']);
		let driver2HLM = parseFloat(driver2Data['HLM Rating']);
		let driver1Media = parseFloat(driver1Data['Media Rating']);
		let driver2Media = parseFloat(driver2Data['Media Rating']);
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
		};*/

		return {
			driver1Data,
			driver2Data,
			sameTeamDriver: driver1Data['Team'] === driver2Data['Team']
		};
	};
	$: driversData = getDrivers(driver1, driver2);

	function clearDrivers() {
		driver1 = 'Select first driver';
		driver2 = 'Select second driver';
	}

	$: {
		if (browser) {
			if (driver1 !== 'Select first driver') {
				//console.log('trackEvent comparison-drivers', driver1, driver2);
				if (window?.ackeeInstance) {
					try {
						//console.log('trackEvent selected-driver', driver1, driver2);
						window.ackeeInstance.action('dab99081-d14f-4d25-8532-798c07f5cd9a', {
							key: driver1,
							value: 1
						});
					} catch (e) {}
				}
			}
		}
	}

	$: {
		if (browser) {
			if (driver2 !== 'Select second driver') {
				//console.log('trackEvent comparison-drivers', driver1, driver2);
				if (window?.ackeeInstance) {
					try {
						//console.log('trackEvent selected-driver', driver1, driver2);
						window.ackeeInstance.action('dab99081-d14f-4d25-8532-798c07f5cd9a', {
							key: driver2,
							value: 1
						});
					} catch (e) {}
				}
			}
		}
	}
</script>

<!--
	<svelte:head>
		<meta name="og:image" content={`https://hotlapmode.app/og?lineup=${driver1}_${driver2}`} />
	</svelte:head>
-->

<div class="container mx-auto flex justify-center flex-col gap-6">
	<div class="flex flex-col md:flex-row gap-4 mx-auto w-full lg:w-[405px]">
		<div class="flex flex-col gap-2 lg:w-1/2">
			<label for="driver1">Driver 1</label>
			<select id="driver1" class="select select-bordered w-full lg:max-w-xs" bind:value={driver1}>
				<option disabled selected>Select first driver</option>
				{#each groups as group}
					<optgroup label={group.label}>
						{#each group.items as item}
							<option disabled={driver2 === item.value} value={item.value}>{item.label}</option>
						{/each}
					</optgroup>
				{/each}
			</select>
		</div>
		<div class="flex flex-col gap-2 lg:w-1/2">
			<label for="driver2">Driver 2</label>
			<select id="driver2" class="select select-bordered w-full lg:max-w-xs" bind:value={driver2}>
				<option disabled selected>Select second driver</option>
				{#each groups as group}
					<optgroup label={group.label}>
						{#each group.items as item}
							<option disabled={driver1 === item.value} value={item.value}>{item.label}</option>
						{/each}
					</optgroup>
				{/each}
			</select>
		</div>
	</div>

	<Tabs {selectedId}>
		<TabList>
			<Tab tooltip="Overview between the two drivers" id="h2h">H2H Comparison</Tab>
			<Tab tooltip="Qualification times for each driver per circuit" id="quali">Quali Data</Tab>
			<Tab tooltip="Average race pace times for each driver per circuit" id="race">Race Data</Tab>
		</TabList>

		{#if driver1 !== undefined && driver2 !== undefined && driver1 !== 'Select first driver' && driver2 !== 'Select second driver' && !driversData.sameTeamDriver}
			<div
				transition:fade
				class="alert alert-warning shadow-lg mt-8 w-fit text-sm mx-auto flex items-center justify-center"
			>
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="stroke-current flex-shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/></svg
					>
					<span
						>Disclaimer: Drivers are not from the same team. Some pace averages for Qualifying or
						Race could be not accurate for comparison</span
					>
				</div>
			</div>
		{/if}
		<div class="_card mt-10 p-4 max-w-[300px] mx-auto text-center rounded-lg">
			Almost there, it's race week!
		</div>

		<!--

			<TabPanel id="h2h">
				{#if driver1 !== undefined && driver2 !== undefined && driver1 !== 'Select first driver' && driver2 !== 'Select second driver'}
				<Comparison
				h2h={data.h2h}
				{driversData}
				qualiData={data.quali.values}
				raceData={data.race.values}
				/>
				{:else}
				<div class="text-center py-4 space-y-2">
					<h2>Select two drivers from the boxes above</h2>
					<p class="text-sm">
						You will be able to see an overall comparison between them, and more detailed Quali/Race
						comparisons.
					</p>
					<p class="text-sm -mt-2">
						If you want to compare teams instead change to <a href="/teams" class="link"
						>teams page</a
						>
					</p>
				</div>
				{/if}
			</TabPanel>
			
			<TabPanel id="quali">
				{#if driver1 !== undefined && driver2 !== undefined && driver1 !== 'Select first driver' && driver2 !== 'Select second driver'}
				{#key driversData}
				<ComparisonRace raceData={data.quali.values} {driversData} />
				{/key}
				{:else}
				<div class="text-center py-4 space-y-2">
					<h2>Select two drivers from the boxes above</h2>
					<p class="text-sm">
						You will be able to see an overall comparison between them, and more detailed Quali/Race
						comparisons.
					</p>
					<p class="text-sm -mt-2">
						If you want to compare teams instead change to <a href="/teams" class="link"
						>teams page</a
						>
					</p>
				</div>
				{/if}
			</TabPanel>
			
			<TabPanel id="race">
				{#if driver1 !== undefined && driver2 !== undefined && driver1 !== 'Select first driver' && driver2 !== 'Select second driver'}
				{#key driversData}
				<ComparisonRace type="race" raceData={data.race.values} {driversData} />
				{/key}
				{:else}
				<div class="text-center py-4 space-y-2">
					<h2>Select two drivers from the boxes above</h2>
					<p class="text-sm">
						You will be able to see an overall comparison between them, and more detailed Quali/Race
						comparisons.
					</p>
					<p class="text-sm -mt-2">
						If you want to compare teams instead change to <a href="/teams" class="link"
						>teams page</a
						>
					</p>
				</div>
				{/if}
			</TabPanel>
		-->
	</Tabs>
	{#if driver1 !== undefined && driver2 !== undefined && driver1 !== 'Select first driver' && driver2 !== 'Select second driver'}
		<div transition:fade class="flex gap-4 justify-center">
			<button
				class="btn gap-2 w-fit bg-base-300"
				on:click={() =>
					toPng(document.getElementById('comparison'), { cacheBust: true })
						.then((dataUrl) => {
							const link = document.createElement('a');
							link.download = `comparison-${driver1}-${driver2}.png`;
							link.href = dataUrl;
							link.click();
							link.remove();
						})
						.catch((err) => {
							console.log(err);
						})}
			>
				Download <svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-6 h-6"
				>
					<path
						fill-rule="evenodd"
						d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
			<button
				class="btn gap-2 w-fit bg-base-300"
				on:click={() => {
					if (
						/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
							navigator.userAgent
						)
					) {
						if (navigator.share) {
							navigator.share({
								title: `hotlapmode - driver comparison`,
								text: `Check out the F1 2022 driver comparison between ${driver1} and ${driver2}`,
								url: `https://hotlapmode.app/?lineup=${driver1}_${driver2}`
							});
							return;
						}
					}
					window.open(
						`https://twitter.com/intent/tweet?text=Check out the F1 2022 driver comparison between ${driver1} and ${driver2}&url=https://hotlapmode.app/?lineup=${driver1}_${driver2}`,
						'_blank'
					);
				}}
			>
				Share <svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-6 h-6"
				>
					<path
						fill-rule="evenodd"
						d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
			<button on:click={clearDrivers} class="btn gap-2 w-fit bg-base-300">
				Clear
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-6 h-6"
				>
					<path
						fill-rule="evenodd"
						d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
		</div>
	{/if}
</div>
