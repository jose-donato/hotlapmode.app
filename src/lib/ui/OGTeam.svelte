<script>
	import clsx from 'clsx';

	export let data;
	const team1 = data.teamsData.team1Data;
	const team2 = data.teamsData.team2Data;
	const qualiPaceTeam1 = data.qualiDataValues.team1;
	const qualiPaceTeam2 = data.qualiDataValues.team2;
	const racePaceTeam1 = data.raceDataValues.team1;
	const racePaceTeam2 = data.raceDataValues.team2;
</script>

<div
	style="background-image: url('https://nyw3moys.directus.app/assets/7f06e3ac-1e9a-48a9-b314-4a11ab7bd927'); background-size: 1200px 800px; background-repeat: no-repeat; background-position: center;"
	class="flex items-center justify-center w-full bg-[#1c1917] text-white h-full text-lg"
	id="comparison"
>
	<div class="flex flex-col">
		<img src={team1['Team Logo']} class="w-40 h-20 object-cover" alt="team1" />
		<div class="flex justify-center h-32 gap-2">
			<div class="flex flex-col justify-center mt-4">
				<h1 class="text-center font-bold tracking-wide my-0">{team1.Team}</h1>
				<h2 class="text-center my-0 text-sm">{team1['2022 Challenger Name']}</h2>
			</div>
		</div>
		<div class="text-center uppercase font-bold flex flex-col -mt-10">
			<p
				class={clsx('my-0', {
					'text-green-500': qualiPaceTeam1.faster,
					'text-red-500': !qualiPaceTeam1.faster
				})}
			>
				{qualiPaceTeam1.avg}%
			</p>

			<p
				class={clsx('my-0', {
					'text-green-500': racePaceTeam1.faster,
					'text-red-500': !racePaceTeam1.faster
				})}
			>
				{racePaceTeam1.avg}%
			</p>

			<p
				class={clsx('my-0', {
					'text-green-500': team1.wins.diff > 0,
					'text-red-500': team1.wins.diff < 0
				})}
			>
				{team1.wins.value}
			</p>
			<p
				class={clsx('my-0', {
					'text-green-500': team1.position.diff > 0,
					'text-red-500': team1.position.diff < 0
				})}
			>
				{team1.position.value}
			</p>
			<p
				class={clsx('my-0', {
					'text-green-500': team1.points.diff > 0,
					'text-red-500': team1.points.diff < 0
				})}
			>
				{team1.points.value}
			</p>
		</div>
	</div>
	<div class="flex flex-col mx-20">
		<img src="https://hotlapmode.app/images/logo.png" alt="logo" class="h-32 object-cover -mb-10" />
		<div class="flex flex-col justify-center text-center uppercase font-bold pt-20 ml-10">
			<p class="my-0">Quali Pace</p>
			<p class="my-0">Race Pace</p>
			<p class="my-0">Wins</p>
			<p class="my-0">Position</p>
			<p class="my-0">Points</p>
		</div>
	</div>
	<div class="flex flex-col">
		<img src={team2['Team Logo']} class="w-40 h-20 object-cover" alt="team1" />
		<div class="flex justify-center h-32 gap-2">
			<div class="flex flex-col justify-center mt-4">
				<h1 class="text-center font-bold tracking-wide my-0">{team2.Team}</h1>
				<h2 class="text-center my-0 text-sm">{team2['2022 Challenger Name']}</h2>
			</div>
		</div>
		<div class="text-center uppercase font-bold flex flex-col -mt-10">
			<p
				class={clsx('my-0', {
					'text-green-500': qualiPaceTeam2.faster,
					'text-red-500': !qualiPaceTeam2.faster
				})}
			>
				{qualiPaceTeam2.avg}%
			</p>

			<p
				class={clsx('my-0', {
					'text-green-500': racePaceTeam2.faster,
					'text-red-500': !racePaceTeam2.faster
				})}
			>
				{racePaceTeam2.avg}%
			</p>
			<p
				class={clsx('my-0', {
					'text-green-500': team2.wins.diff > 0,
					'text-red-500': team2.wins.diff < 0
				})}
			>
				{team2.wins.value}
			</p>
			<p
				class={clsx('my-0', {
					'text-green-500': team2.position.diff > 0,
					'text-red-500': team2.position.diff < 0
				})}
			>
				{team2.position.value}
			</p>
			<p
				class={clsx('my-0', {
					'text-green-500': team2.points.diff > 0,
					'text-red-500': team2.points.diff < 0
				})}
			>
				{team2.points.value}
			</p>
		</div>
	</div>
</div>
