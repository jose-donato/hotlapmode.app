<script lang="ts">
	import clsx from 'clsx';

	type teamType = {
		groupItem: boolean;
		value: string;
		label: string;
		selectable?: boolean;
	};
	export let team1: teamType;
	export let team2: teamType;

	export let teamsData;

	const getTeams = (team1: teamType, team2: teamType) => {
		const teams = teamsData.filter((team) => {
			return team.Team === team1.value || team.Team === team2.value;
		});

		let team1Data = teams[0];
		let team2Data = teams[1];

		team1Data = {
			...team1Data,
			points: {
				value: team1Data['points'],
				diff: team1Data['points'] - team2Data['points']
			},
			wins: {
				value: team1Data['wins'],
				diff: team1Data['wins'] - team2Data['wins']
			},
			position: {
				value: team1Data['position'],
				diff: team2Data['position'] - team1Data['position']
			}
		};

		team2Data = {
			...team2Data,
			points: {
				value: team2Data['points'],
				diff: team2Data['points'] - team1Data['points'].value
			},
			wins: {
				value: team2Data['wins'],
				diff: team2Data['wins'] - team1Data['wins'].value
			},
			position: {
				value: team2Data['position'],
				diff: team1Data['position'].value - team2Data['position']
			}
		};

		return { team1Data, team2Data };
	};

	const { team1Data, team2Data } = getTeams(team1, team2);
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
<div class="w-72 flex flex-col justify-center items-center">
	<div class="flex justify-center h-20 gap-10">
		<div class="flex flex-col justify-center">
			<h1 class="text-center text-xl font-bold tracking-wide">{team1Data['Full Team Name']}</h1>
			<h2 class="text-center">{team1Data.Team}</h2>
		</div>
	</div>
	<div class="text-center uppercase text-xl font-bold space-y-2">
		<p
			class={clsx({
				'text-green-500': team1Data.wins.diff > 0,
				'text-red-500': team1Data.wins.diff < 0
			})}
		>
			{team1Data.wins.value}
		</p>
		<p
			class={clsx({
				'text-green-500': team1Data.position.diff > 0,
				'text-red-500': team1Data.position.diff < 0
			})}
		>
			{team1Data.position.value}
		</p>
		<p
			class={clsx({
				'text-green-500': team1Data.points.diff > 0,
				'text-red-500': team1Data.points.diff < 0
			})}
		>
			{team1Data.points.value}
		</p>
	</div>
</div>
<div class="mx-10">
	<div class="flex gap-10">
		<img src={team1Data['Team Logo']} class="w-40 h-20 object-cover" alt="team 1" />
		<div class="h-20 flex items-center justify-center flex-col">
			<h1 class="text-center text-xl font-bold tracking-wide">hotlapmode.app</h1>
			<h2 class="text-center">developed by jose-donato</h2>
		</div>
		<img src={team2Data['Team Logo']} class="w-40 h-20 object-cover" alt="team 2" />
	</div>
	<div class="text-center uppercase text-xl font-bold space-y-2">
		<p>Wins</p>
		<p>Position</p>
		<p>Points</p>
	</div>
</div>

<div class="w-72 flex flex-col justify-center items-center">
	<div class="flex justify-center h-20 gap-10">
		<div class="flex flex-col justify-center">
			<h1 class="text-center text-xl font-bold tracking-wide">{team2Data['Full Team Name']}</h1>
			<h2 class="text-center">{team2Data.Team}</h2>
		</div>
	</div>
	<div class="text-center uppercase text-xl font-bold space-y-2">
		<p
			class={clsx({
				'text-green-500': team2Data.wins.diff > 0,
				'text-red-500': team2Data.wins.diff < 0
			})}
		>
			{team2Data.wins.value}
		</p>
		<p
			class={clsx({
				'text-green-500': team2Data.position.diff > 0,
				'text-red-500': team2Data.position.diff < 0
			})}
		>
			{team2Data.position.value}
		</p>
		<p
			class={clsx({
				'text-green-500': team2Data.points.diff > 0,
				'text-red-500': team2Data.points.diff < 0
			})}
		>
			{team2Data.points.value}
		</p>
	</div>
</div>
