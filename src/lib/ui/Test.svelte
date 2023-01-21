<script>
	import clsx from 'clsx';

	export let data;
	// qualiDataValues, raceDataValues, driversData
	const driver1 = data.driversData.driver1Data;
	const driver2 = data.driversData.driver2Data;
	const qualiPaceDriver1 = data.qualiDataValues.driver1;
	const qualiPaceDriver2 = data.qualiDataValues.driver2;
	const racePaceDriver1 = data.raceDataValues.driver1;
	const racePaceDriver2 = data.raceDataValues.driver2;
</script>

<div
	style="background-image: url('https://nyw3moys.directus.app/assets/7f06e3ac-1e9a-48a9-b314-4a11ab7bd927'); background-size: 1200px 800px; background-repeat: no-repeat; background-position: center;"
	class="flex items-center justify-center w-full bg-[#1c1917] text-white h-full text-lg"
	id="comparison"
>
	<div class="flex flex-col">
		<img src={driver1.Image} class="w-32 h-32 object-cover" alt="driver1" />
		<div class="flex justify-center h-32 gap-2">
			<div class="flex flex-col justify-center mt-4">
				<h1 class="text-center font-bold tracking-wide my-0">{driver1['Full Name']}</h1>
				<h2 class="text-center my-0 text-sm">{driver1.Team}</h2>
			</div>
		</div>
		<div class="text-center uppercase font-bold flex flex-col -mt-10">
			<p
				class={clsx('my-0', {
					'text-green-500': driver1.mediaRating.diff > 0,
					'text-red-500': driver1.mediaRating.diff < 0
				})}
			>
				{driver1.mediaRating.value}
			</p>
			<p
				class={clsx('my-0', {
					'text-green-500': driver1.hlmRating.diff > 0,
					'text-red-500': driver1.hlmRating.diff < 0
				})}
			>
				{driver1.hlmRating.value}
			</p>
			<p
				class={clsx('my-0', {
					'text-green-500': qualiPaceDriver1.ahead.diff < 0,
					'text-red-500': qualiPaceDriver1.ahead.diff > 0
				})}
			>
				{qualiPaceDriver1.avg}%
			</p>
			<p
				class={clsx('my-0', {
					'text-green-500': qualiPaceDriver1.ahead.diff < 0,
					'text-red-500': qualiPaceDriver1.ahead.diff > 0,
					'text-white': qualiPaceDriver1.ahead.diff === 0
				})}
			>
				{qualiPaceDriver1.ahead.amount}
			</p>

			<p
				class={clsx('my-0', {
					'text-green-500': racePaceDriver1.ahead.diff < 0,
					'text-red-500': racePaceDriver1.ahead.diff > 0
				})}
			>
				{racePaceDriver1.avg}%
			</p>
			<p
				class={clsx('my-0', {
					'text-green-500': racePaceDriver1.ahead.diff < 0,
					'text-red-500': racePaceDriver1.ahead.diff > 0,
					'text-white': racePaceDriver1.ahead.diff === 0
				})}
			>
				{racePaceDriver1.ahead.amount}
			</p>
			<p
				class={clsx('my-0', {
					'text-green-500': racePaceDriver1.dnfs.diff < 0,
					'text-red-500': racePaceDriver1.dnfs.diff > 0,
					'text-white': racePaceDriver1.dnfs.diff === 0
				})}
			>
				{racePaceDriver1.dnfs.amount}
			</p>
			<p
				class={clsx('my-0', {
					'text-green-500': driver1.wins.diff > 0,
					'text-red-500': driver1.wins.diff < 0
				})}
			>
				{driver1.wins.value}
			</p>
			<p
				class={clsx('my-0', {
					'text-green-500': driver1.position.diff > 0,
					'text-red-500': driver1.position.diff < 0
				})}
			>
				{driver1.position.value}
			</p>
			<p
				class={clsx('my-0', {
					'text-green-500': driver1.points.diff > 0,
					'text-red-500': driver1.points.diff < 0
				})}
			>
				{driver1.points.value}
			</p>
		</div>
	</div>
	<div class="flex flex-col mx-20">
		<img src="https://hotlapmode.app/images/logo.png" alt="logo" class="h-32 object-cover -mb-10" />
		<div class="flex flex-col justify-center text-center uppercase font-bold pt-32 ml-10">
			<p class="my-0">Media Rating</p>
			<p class="my-0">HLM Rating</p>
			<p class="my-0">Quali Pace</p>
			<p class="my-0">H2H Quali</p>
			<p class="my-0">Race Pace</p>
			<p class="my-0">H2H Race</p>
			<p class="my-0">DNFs</p>
			<p class="my-0">Wins</p>
			<p class="my-0">Position</p>
			<p class="my-0">Points</p>
		</div>
	</div>
	<div class="flex flex-col">
		<img src={driver2.Image} class="w-32 h-32 object-cover" alt="driver1" />
		<div class="flex justify-center h-32 gap-2">
			<div class="flex flex-col justify-center mt-4">
				<h1 class="text-center font-bold tracking-wide my-0">{driver2['Full Name']}</h1>
				<h2 class="text-center my-0 text-sm">{driver2.Team}</h2>
			</div>
		</div>
		<div class="text-center uppercase font-bold flex flex-col -mt-10">
			<p
				class={clsx('my-0', {
					'text-green-500': driver2.mediaRating.diff > 0,
					'text-red-500': driver2.mediaRating.diff < 0
				})}
			>
				{driver2.mediaRating.value}
			</p>
			<p
				class={clsx('my-0', {
					'text-green-500': driver2.hlmRating.diff > 0,
					'text-red-500': driver2.hlmRating.diff < 0
				})}
			>
				{driver2.hlmRating.value}
			</p>
			<p
				class={clsx('my-0', {
					'text-green-500': qualiPaceDriver2.ahead.diff < 0,
					'text-red-500': qualiPaceDriver2.ahead.diff > 0
				})}
			>
				{qualiPaceDriver2.avg}%
			</p>
			<p
				class={clsx('my-0', {
					'text-green-500': qualiPaceDriver2.ahead.diff < 0,
					'text-red-500': qualiPaceDriver2.ahead.diff > 0,
					'text-white': qualiPaceDriver2.ahead.diff === 0
				})}
			>
				{qualiPaceDriver2.ahead.amount}
			</p>

			<p
				class={clsx('my-0', {
					'text-green-500': racePaceDriver2.ahead.diff < 0,
					'text-red-500': racePaceDriver2.ahead.diff > 0
				})}
			>
				{racePaceDriver2.avg}%
			</p>
			<p
				class={clsx('my-0', {
					'text-green-500': racePaceDriver2.ahead.diff < 0,
					'text-red-500': racePaceDriver2.ahead.diff > 0,
					'text-white': racePaceDriver2.ahead.diff === 0
				})}
			>
				{racePaceDriver2.ahead.amount}
			</p>
			<p
				class={clsx('my-0', {
					'text-green-500': racePaceDriver2.dnfs.diff < 0,
					'text-red-500': racePaceDriver2.dnfs.diff > 0,
					'text-white': racePaceDriver2.dnfs.diff === 0
				})}
			>
				{racePaceDriver2.dnfs.amount}
			</p>
			<p
				class={clsx('my-0', {
					'text-green-500': driver2.wins.diff > 0,
					'text-red-500': driver2.wins.diff < 0
				})}
			>
				{driver2.wins.value}
			</p>
			<p
				class={clsx('my-0', {
					'text-green-500': driver2.position.diff > 0,
					'text-red-500': driver2.position.diff < 0
				})}
			>
				{driver2.position.value}
			</p>
			<p
				class={clsx('my-0', {
					'text-green-500': driver2.points.diff > 0,
					'text-red-500': driver2.points.diff < 0
				})}
			>
				{driver2.points.value}
			</p>
		</div>
	</div>
</div>
