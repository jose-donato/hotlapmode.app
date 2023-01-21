<script lang="ts">
	import { getAllTeamData } from '$lib/client/stats';
	import Team from './Team.svelte';

	export let teamsData;
	export let qualiData;
	export let raceData;

	$: data = getAllTeamData(qualiData, raceData, teamsData);
</script>

<div class="my-8">
	<div class="flex gap-4 items-center justify-between bg-base-300/80" id="comparison">
		<Team
			qualiPaceTeam={data.qualiDataValues.team1}
			racePaceTeam={data.raceDataValues.team1}
			team={teamsData.team1Data}
		/>
		<div class="lg:mx-10">
			<img src="images/logo.webp" alt="logo" class="z-10 w-56 object-cover" />
			<div class="text-center uppercase text-sm lg:text-xl font-bold space-y-2 mt-12 lg:mt-10">
				<p>Quali Pace</p>
				<p>Race Pace</p>
				<p>Wins</p>
				<p>Position</p>
				<p>Points</p>
			</div>
		</div>
		<Team
			qualiPaceTeam={data.qualiDataValues.team2}
			racePaceTeam={data.raceDataValues.team2}
			team={teamsData.team2Data}
		/>
	</div>
</div>
