<script lang="ts">
	import clsx from 'clsx';

	type driverType = {
		Image: string;
		Driver: string;
		'Full Name': string;
		Team: string;
	};
	export let driver: driverType;
	export let qualiPaceDriver;
	export let racePaceDriver;
	export let showMediaRatings = true;

	async function callApi(url: string) {
		const response = await fetch('/api?url=' + url);
		const data = await response.json();
		return data.base64;
	}
</script>

<div class="lg:w-72 flex flex-col justify-center items-center">
	{#if driver.Image.includes('https://')}
		{#await callApi(driver.Image)}
			<div class="w-20 h-20" />
		{:then src}
			<img {src} class="w-20 h-20 object-cover" alt="driver" />
		{/await}
	{:else}
		<img src={driver.Image} class="w-20 h-20 object-cover" alt="driver" />
	{/if}
	<div class="flex justify-center h-20 gap-10">
		<div class="flex flex-col justify-center">
			<h1 class="text-center text-sm lg:text-xl font-bold tracking-wide">{driver['Full Name']}</h1>
			<h2 class="text-center">{driver.Team}</h2>
		</div>
	</div>
	<div class="text-center uppercase text-sm lg:text-xl font-bold space-y-2">
		{#if showMediaRatings}
			<p
				class={clsx({
					'text-green-500': driver.mediaRating.diff > 0,
					'text-red-500': driver.mediaRating.diff < 0
				})}
			>
				{driver.mediaRating.value}
			</p>
			<p
				class={clsx({
					'text-green-500': driver.hlmRating.diff > 0,
					'text-red-500': driver.hlmRating.diff < 0
				})}
			>
				{driver.hlmRating.value}
			</p>
		{/if}
		<p
			class={clsx({
				'text-green-500': qualiPaceDriver.ahead.diff < 0,
				'text-red-500': qualiPaceDriver.ahead.diff > 0
			})}
		>
			{qualiPaceDriver.avg}%
		</p>
		<p
			class={clsx({
				'text-green-500': qualiPaceDriver.ahead.diff < 0,
				'text-red-500': qualiPaceDriver.ahead.diff > 0,
				'text-white': qualiPaceDriver.ahead.diff === 0
			})}
		>
			{qualiPaceDriver.ahead.amount}
		</p>

		<p
			class={clsx({
				'text-green-500': racePaceDriver.ahead.diff < 0,
				'text-red-500': racePaceDriver.ahead.diff > 0
			})}
		>
			{racePaceDriver.avg}%
		</p>
		<p
			class={clsx({
				'text-green-500': racePaceDriver.ahead.diff < 0,
				'text-red-500': racePaceDriver.ahead.diff > 0,
				'text-white': racePaceDriver.ahead.diff === 0
			})}
		>
			{racePaceDriver.ahead.amount}
		</p>
		<p
			class={clsx({
				'text-green-500': racePaceDriver.dnfs.diff < 0,
				'text-red-500': racePaceDriver.dnfs.diff > 0,
				'text-white': racePaceDriver.dnfs.diff === 0
			})}
		>
			{racePaceDriver.dnfs.amount}
		</p>
		<p
			class={clsx({
				'text-green-500': driver.wins.diff > 0,
				'text-red-500': driver.wins.diff < 0
			})}
		>
			{driver.wins.value}
		</p>
		<p
			class={clsx({
				'text-green-500': driver.position.diff > 0,
				'text-red-500': driver.position.diff < 0
			})}
		>
			{driver.position.value}
		</p>
		<p
			class={clsx({
				'text-green-500': driver.points.diff > 0,
				'text-red-500': driver.points.diff < 0
			})}
		>
			{driver.points.value}
		</p>
	</div>
</div>
