<script lang="ts">
	import clsx from 'clsx';

	type driverType = {
		Image: string;
		Driver: string;
		'Full Name': string;
		Team: string;
	};
	export let driver: driverType;
	export let qualiPace;
	export let racePace;
	export let driverType;
</script>

<div class="w-72 flex flex-col justify-center items-center">
	<div class="flex justify-center h-20 gap-10">
		<div class="flex flex-col justify-center">
			<h1 class="text-center text-xl font-bold tracking-wide">{driver['Full Name']}</h1>
			<h2 class="text-center">{driver.Team}</h2>
		</div>
	</div>
	<div class="text-center uppercase text-xl font-bold space-y-2">
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
		<p
			class={clsx({
				'text-green-500': driverType === qualiPace.fasterDriver,
				'text-red-500': driverType !== qualiPace.fasterDriver
			})}
		>
			{driverType === 'Driver 1' ? qualiPace.driver1 : qualiPace.driver2}%
		</p>
		<p
			class={clsx({
				'text-green-500':
					driverType === 'Driver 1'
						? qualiPace.driver1Ahead.diff < 0
						: qualiPace.driver2Ahead.diff < 0,
				'text-red-500':
					driverType === 'Driver 1'
						? qualiPace.driver1Ahead.diff > 0
						: qualiPace.driver2Ahead.diff > 0,
				'text-white':
					driverType === 'Driver 1'
						? qualiPace.driver1Ahead.diff === 0
						: qualiPace.driver2Ahead.diff === 0
			})}
		>
			{driverType === 'Driver 1' ? qualiPace.driver1Ahead.amount : qualiPace.driver2Ahead.amount}
		</p>

		<p
			class={clsx({
				'text-green-500': driverType === racePace.fasterDriver,
				'text-red-500': driverType !== racePace.fasterDriver
			})}
		>
			{driverType === 'Driver 1' ? racePace.driver1 : racePace.driver2}%
		</p>
		<p
			class={clsx({
				'text-green-500':
					driverType === 'Driver 1'
						? racePace.driver1Ahead.diff < 0
						: racePace.driver2Ahead.diff < 0,
				'text-red-500':
					driverType === 'Driver 1'
						? racePace.driver1Ahead.diff > 0
						: racePace.driver2Ahead.diff > 0,
				'text-white':
					driverType === 'Driver 1'
						? racePace.driver1Ahead.diff === 0
						: racePace.driver2Ahead.diff === 0
			})}
		>
			{driverType === 'Driver 1' ? racePace.driver1Ahead.amount : racePace.driver2Ahead.amount}
		</p>
		<p
			class={clsx({
				'text-green-500':
					driverType === 'Driver 1' ? racePace.driver1DNFs.diff < 0 : racePace.driver2DNFs.diff < 0,
				'text-red-500':
					driverType === 'Driver 1' ? racePace.driver1DNFs.diff > 0 : racePace.driver2DNFs.diff > 0,
				'text-white':
					driverType === 'Driver 1'
						? racePace.driver1DNFs.diff === 0
						: racePace.driver2DNFs.diff === 0
			})}
		>
			{driverType === 'Driver 1' ? racePace.driver1DNFs.amount : racePace.driver2DNFs.amount}
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
