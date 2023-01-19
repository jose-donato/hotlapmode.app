<script lang="ts">
	import {
		compareTeamValues,
		compareValues,
		getDriverValues,
		getTeamValues
	} from '$lib/client/stats';
	import Export from './Export.svelte';
	import Team from './Team.svelte';
	import { toPng } from 'html-to-image';

	export let team1: string;
	export let team2: string;

	export let team1Data;
	export let team2Data;

	export let qualiData;
	export let raceData;

	const qualiTeams = getTeamValues(qualiData, team1, team2);

	const qualiTeamsValues = compareTeamValues(qualiTeams[0], qualiTeams[1]);
	const raceTeams = getTeamValues(raceData, team1, team2);

	const raceTeamValues = compareTeamValues(raceTeams[0], raceTeams[1]);
</script>

<div class="p-4">
	<Export
		downloadCsvFn={() => {}}
		downloadImgFn={() =>
			toPng(document.getElementById('comparison'), { cacheBust: true })
				.then((dataUrl) => {
					const link = document.createElement('a');
					link.download = 'comparison.png';
					link.href = dataUrl;
					link.click();
				})
				.catch((err) => {
					console.log(err);
				})}
	/>
	<div class="flex gap-4 items-center justify-between">
		<Team
			qualiPaceTeam={qualiTeamsValues.team1}
			racePaceTeam={raceTeamValues.team1}
			team={team1Data}
		/>
		<div class="lg:mx-10">
			<img src="images/logo.webp" alt="logo" class="z-10 w-56 object-cover" />
			<div class="text-center uppercase text-sm lg:text-xl font-bold space-y-2 mt-20 lg:mt-10">
				<p>Quali Pace</p>
				<p>Race Pace</p>
				<p>Wins</p>
				<p>Position</p>
				<p>Points</p>
			</div>
		</div>
		<Team
			qualiPaceTeam={qualiTeamsValues.team2}
			racePaceTeam={raceTeamValues.team2}
			team={team2Data}
		/>
	</div>
</div>
