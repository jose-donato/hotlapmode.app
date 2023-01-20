<script>
	import clsx from 'clsx';

	export let data;
	console.log(data);
	// qualiDataValues, raceDataValues, driversData
	const driver1 = data.driversData.driver1Data;
	const driver2 = data.driversData.driver2Data;
	const qualiPaceDriver1 = data.qualiDataValues.driver1;
	const qualiPaceDriver2 = data.qualiDataValues.driver2;
	const racePaceDriver1 = data.raceDataValues.driver1;
	const racePaceDriver2 = data.raceDataValues.driver2;
</script>

<div
	style="background-image: url('https://nyw3moys.directus.app/assets/7f06e3ac-1e9a-48a9-b314-4a11ab7bd927'); background-size: 1200px 800px;"
	class="flex items-center justify-center w-full bg-[#1c1917] text-white h-full"
	id="comparison"
>
	<div class="flex flex-col">
		<img src={driver1.Image} class="w-20 h-20 object-cover" alt="driver1" />
		<div class="flex justify-center h-20 gap-2">
			<div class="flex flex-col justify-center mt-4">
				<h1 class="text-center font-bold tracking-wide my-1">{driver1['Full Name']}</h1>
				<h2 class="text-center my-1">{driver1.Team}</h2>
			</div>
		</div>
		<div class="text-center uppercase text-sm font-bold flex flex-col">
			<p
				class={clsx('my-1', {
					'text-green-500': driver1.mediaRating.diff > 0,
					'text-red-500': driver1.mediaRating.diff < 0
				})}
			>
				{driver1.mediaRating.value}
			</p>
			<p
				class={clsx('my-1', {
					'text-green-500': driver1.hlmRating.diff > 0,
					'text-red-500': driver1.hlmRating.diff < 0
				})}
			>
				{driver1.hlmRating.value}
			</p>
			<p
				class={clsx('my-1', {
					'text-green-500': qualiPaceDriver1.ahead.diff < 0,
					'text-red-500': qualiPaceDriver1.ahead.diff > 0
				})}
			>
				{qualiPaceDriver1.avg}%
			</p>
			<p
				class={clsx('my-1', {
					'text-green-500': qualiPaceDriver1.ahead.diff < 0,
					'text-red-500': qualiPaceDriver1.ahead.diff > 0,
					'text-white': qualiPaceDriver1.ahead.diff === 0
				})}
			>
				{qualiPaceDriver1.ahead.amount}
			</p>

			<p
				class={clsx('my-1', {
					'text-green-500': racePaceDriver1.ahead.diff < 0,
					'text-red-500': racePaceDriver1.ahead.diff > 0
				})}
			>
				{racePaceDriver1.avg}%
			</p>
			<p
				class={clsx('my-1', {
					'text-green-500': racePaceDriver1.ahead.diff < 0,
					'text-red-500': racePaceDriver1.ahead.diff > 0,
					'text-white': racePaceDriver1.ahead.diff === 0
				})}
			>
				{racePaceDriver1.ahead.amount}
			</p>
			<p
				class={clsx('my-1', {
					'text-green-500': racePaceDriver1.dnfs.diff < 0,
					'text-red-500': racePaceDriver1.dnfs.diff > 0,
					'text-white': racePaceDriver1.dnfs.diff === 0
				})}
			>
				{racePaceDriver1.dnfs.amount}
			</p>
			<p
				class={clsx('my-1', {
					'text-green-500': driver1.wins.diff > 0,
					'text-red-500': driver1.wins.diff < 0
				})}
			>
				{driver1.wins.value}
			</p>
			<p
				class={clsx('my-1', {
					'text-green-500': driver1.position.diff > 0,
					'text-red-500': driver1.position.diff < 0
				})}
			>
				{driver1.position.value}
			</p>
			<p
				class={clsx('my-1', {
					'text-green-500': driver1.points.diff > 0,
					'text-red-500': driver1.points.diff < 0
				})}
			>
				{driver1.points.value}
			</p>
		</div>
	</div>
	<div class="flex flex-col mx-20">
		<img src="https://hotlapmode.app/images/logo.png" alt="logo" class="w-56 object-cover" />
		<div class="flex flex-col justify-center text-center uppercase text-sm font-bold mt-10 ml-10">
			<p class="my-1">Media Rating</p>
			<p class="my-1">HLM Rating</p>
			<p class="my-1">Quali Pace</p>
			<p class="my-1">H2H Quali</p>
			<p class="my-1">Race Pace</p>
			<p class="my-1">H2H Race</p>
			<p class="my-1">DNFs</p>
			<p class="my-1">Wins</p>
			<p class="my-1">Position</p>
			<p class="my-1">Points</p>
		</div>
	</div>
	<div class="flex flex-col">
		<img src={driver2.Image} class="w-20 h-20 object-cover" alt="driver1" />
		<div class="flex justify-center h-20 gap-2">
			<div class="flex flex-col justify-center mt-4">
				<h1 class="text-center font-bold tracking-wide my-1">{driver2['Full Name']}</h1>
				<h2 class="text-center my-1">{driver2.Team}</h2>
			</div>
		</div>
		<div class="text-center uppercase text-sm font-bold flex flex-col">
			<p
				class={clsx('my-1', {
					'text-green-500': driver2.mediaRating.diff > 0,
					'text-red-500': driver2.mediaRating.diff < 0
				})}
			>
				{driver2.mediaRating.value}
			</p>
			<p
				class={clsx('my-1', {
					'text-green-500': driver2.hlmRating.diff > 0,
					'text-red-500': driver2.hlmRating.diff < 0
				})}
			>
				{driver2.hlmRating.value}
			</p>
			<p
				class={clsx('my-1', {
					'text-green-500': qualiPaceDriver2.ahead.diff < 0,
					'text-red-500': qualiPaceDriver2.ahead.diff > 0
				})}
			>
				{qualiPaceDriver2.avg}%
			</p>
			<p
				class={clsx('my-1', {
					'text-green-500': qualiPaceDriver2.ahead.diff < 0,
					'text-red-500': qualiPaceDriver2.ahead.diff > 0,
					'text-white': qualiPaceDriver2.ahead.diff === 0
				})}
			>
				{qualiPaceDriver2.ahead.amount}
			</p>

			<p
				class={clsx('my-1', {
					'text-green-500': racePaceDriver2.ahead.diff < 0,
					'text-red-500': racePaceDriver2.ahead.diff > 0
				})}
			>
				{racePaceDriver2.avg}%
			</p>
			<p
				class={clsx('my-1', {
					'text-green-500': racePaceDriver2.ahead.diff < 0,
					'text-red-500': racePaceDriver2.ahead.diff > 0,
					'text-white': racePaceDriver2.ahead.diff === 0
				})}
			>
				{racePaceDriver2.ahead.amount}
			</p>
			<p
				class={clsx('my-1', {
					'text-green-500': racePaceDriver2.dnfs.diff < 0,
					'text-red-500': racePaceDriver2.dnfs.diff > 0,
					'text-white': racePaceDriver2.dnfs.diff === 0
				})}
			>
				{racePaceDriver2.dnfs.amount}
			</p>
			<p
				class={clsx('my-1', {
					'text-green-500': driver2.wins.diff > 0,
					'text-red-500': driver2.wins.diff < 0
				})}
			>
				{driver2.wins.value}
			</p>
			<p
				class={clsx('my-1', {
					'text-green-500': driver2.position.diff > 0,
					'text-red-500': driver2.position.diff < 0
				})}
			>
				{driver2.position.value}
			</p>
			<p
				class={clsx('my-1', {
					'text-green-500': driver2.points.diff > 0,
					'text-red-500': driver2.points.diff < 0
				})}
			>
				{driver2.points.value}
			</p>
		</div>
	</div>
</div>
