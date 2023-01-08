<script>
	import Card from '../components/card.svelte';
	import Table from '../components/table.svelte';
	import { getDriverQualiValues } from '../utils/quali';

	/** @type {import('./$types').PageData} */
	export let data;

	let circuits = data.quali.values.map((q) => q.Circuit);

	circuits = circuits.slice(0, circuits.length - 1);

	/** @type {string} */
	let driver1 = data.drivers.values[0].Driver;
	/** @type {string} */
	let driver2 = data.drivers.values[1].Driver;
	let driver1Found = null,
		driver2Found = null;

	$: {
		driver1Found = {
			driverData: data.drivers.values.find((driver) => driver.Driver === driver1),
			qualiValues: getDriverQualiValues(data.quali.values, driver1),
			raceValues: getDriverQualiValues(data.race.values, driver1)
		};
	}
	$: {
		driver2Found = {
			driverData: data.drivers.values.find((driver) => driver.Driver === driver2),
			qualiValues: getDriverQualiValues(data.quali.values, driver2),
			raceValues: getDriverQualiValues(data.race.values, driver2)
		};
	}
	console.log(data);
</script>

<div class="container mx-auto py-10">
	<h2 class="uppercase font-bold tracking-widest mb-2 text-center">H2H Quali Performances</h2>
	<div class="flex flex-col md:flex-row justify-center mb-4 gap-2">
		<div class="flex flex-col gap-2 card p-4 w-full md:w-80">
			<label for="driver1">Driver 1</label>
			<select id="driver1" bind:value={driver1}>
				{#each data.drivers.values as driver}
					<option value={driver.Driver}>{driver['Full Name']}</option>
				{/each}
			</select>
			{#if driver1Found}
				<div class="flex gap-4 justify-between">
					<div class="flex flex-col text-sm">
						<div class="whitespace-nowrap">
							<strong>Full Name:</strong>
							{driver1Found?.driverData['Full Name']}
						</div>
						<div class="whitespace-nowrap">
							<strong>Age:</strong>
							{driver1Found?.driverData.Age}
						</div>
						<div class="whitespace-nowrap">
							<strong>Team:</strong>
							{driver1Found?.driverData.Team}
						</div>
						<div class="whitespace-nowrap">
							<strong>Car Number:</strong>
							{driver1Found?.driverData.Number}
						</div>
					</div>
					<img src={driver1Found?.driverData.Image} alt={driver1} class="w-20 h-20 bg-contain" />
				</div>
			{/if}
		</div>
		<div class="flex flex-col gap-2 card p-4 w-full md:w-80">
			<label for="driver2">Driver 2</label>
			<select id="driver2" bind:value={driver2}>
				{#each data.drivers.values as driver}
					<option value={driver.Driver}>{driver['Full Name']}</option>
				{/each}
			</select>
			{#if driver2Found}
				<div class="flex gap-4 justify-between">
					<div class="flex flex-col text-sm">
						<div class="whitespace-nowrap">
							<strong>Full Name:</strong>
							{driver2Found?.driverData['Full Name']}
						</div>
						<div class="whitespace-nowrap">
							<strong>Age:</strong>
							{driver2Found?.driverData.Age}
						</div>
						<div class="whitespace-nowrap">
							<strong>Team:</strong>
							{driver2Found?.driverData.Team}
						</div>
						<div class="whitespace-nowrap">
							<strong>Car Number:</strong>
							{driver2Found?.driverData.Number}
						</div>
					</div>
					<img src={driver2Found?.driverData.Image} alt={driver1} class="w-20 h-20 bg-contain" />
				</div>
			{/if}
		</div>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
		<Card title="Quali Lap Times">
			<Table
				columns={['Circuit', 'Driver1', 'Driver2', 'Difference']}
				rows={circuits.map((circuit) => {
					const driver1Laptime = driver1Found?.qualiValues[circuit];
					const driver2Laptime = driver2Found?.qualiValues[circuit];
					const difference =
						driver1Laptime > 0 && driver2Laptime > 0 ? driver1Laptime / driver2Laptime - 1 : '-';
					return {
						Circuit: circuit,
						Driver1: {
							value: driver1Found?.qualiValues[circuit],
							color: typeof difference === 'number' ? (difference < 0 ? 'green' : 'red') : 'grey'
						},
						Driver2: {
							value: driver2Found?.qualiValues[circuit],
							color: typeof difference === 'number' ? (difference > 0 ? 'green' : 'red') : 'grey'
						},
						Difference:
							typeof difference === 'number' ? `${(difference * 100).toFixed(2)}%` : difference
					};
				})}
			/>
		</Card>
		<Card title="Avg Race Pace">
			<Table
				columns={['Circuit', 'Driver1', 'Driver2', 'Difference']}
				rows={circuits.map((circuit) => {
					const driver1Laptime = driver1Found?.raceValues[circuit];
					const driver2Laptime = driver2Found?.raceValues[circuit];
					const difference =
						driver1Laptime > 0 && driver2Laptime > 0 ? driver1Laptime / driver2Laptime - 1 : '-';
					return {
						Circuit: circuit,
						Driver1: {
							value: driver1Found?.raceValues[circuit],
							color: typeof difference === 'number' ? (difference < 0 ? 'green' : 'red') : 'grey'
						},
						Driver2: {
							value: driver2Found?.raceValues[circuit],
							color: typeof difference === 'number' ? (difference > 0 ? 'green' : 'red') : 'grey'
						},
						Difference:
							typeof difference === 'number' ? `${(difference * 100).toFixed(2)}%` : difference
					};
				})}
			/>
		</Card>
	</div>
	<hr class="bg-grey-800/10 backdrop-filter backdrop-blur h-0.5 w-full my-20" />
	<h2 class="uppercase font-bold tracking-widest mb-2 text-center">Driver Scores</h2>
	<div class="grid md:grid-cols-2 gap-2">
		<Card
			title="Autosport Avg Score"
			source={{
				url: 'https://www.autosport.com/f1/news/150000/autosport-f1-power-rankings-2021-season-opener',
				name: 'Autosport'
			}}
		>
			<Table rows={data.autoSportScores.autosport} columns={['Rank', 'Driver', 'Score']} />
		</Card>
		<Card
			title="Reader Avg Score"
			source={{
				url: 'https://www.formula1.com/en/latest/article.f1-power-ranking-2021-season-opener.6Y5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z.html',
				name: 'Autosport'
			}}
		>
			<Table rows={data.autoSportScores.reader} columns={['Rank', 'Driver', 'Score']} />
		</Card>
	</div>
</div>
