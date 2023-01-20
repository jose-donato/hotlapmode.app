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

	export let teamsData;
	export let qualiData;
	export let raceData;

	$: qualiTeamValues = compareTeamValues(
		qualiData,
		teamsData.team1Data.Team,
		teamsData.team2Data.Team,
		'Quali'
	);

	$: raceTeamValues = compareTeamValues(
		raceData,
		teamsData.team1Data.Team,
		teamsData.team2Data.Team,
		'Race'
	);
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
			qualiPaceTeam={qualiTeamValues.team1}
			racePaceTeam={raceTeamValues.team1}
			team={teamsData.team1Data}
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
			qualiPaceTeam={qualiTeamValues.team2}
			racePaceTeam={raceTeamValues.team2}
			team={teamsData.team2Data}
		/>
	</div>
</div>
