import { env } from '$env/dynamic/private';
import { getTeamStandings } from '$lib/server/api';
import cache from '$lib/server/cache';
import { authenticateSheet, getSheetData } from '$lib/server/sheets';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const cached = cache.get('teams-data-2023');
	if (cached) {
		return cached;
	}
	const doc = await authenticateSheet(env.SPREADSHEET_ID_2023);
	const teamsSheet = doc.sheetsByTitle['Team Details'];
	const teams = await getSheetData(teamsSheet);
	/*
	const teamsRacePaceSheet = doc.sheetsByTitle['Team Race Pace'];
	const teamsQualiPaceSheet = doc.sheetsByTitle['Team Quali Pace'];

	const teamsRacePace = await getSheetData(teamsRacePaceSheet);
	const teamsQualiPace = await getSheetData(teamsQualiPaceSheet);

	const teamStandings = await getTeamStandings();

	teams.values.forEach((team: any) => {
		const teamStanding = teamStandings.find((standing: any) =>
			standing.Constructor.name.toLowerCase().includes(team.Team.toLowerCase())
		);
		if (teamStanding) {
			team.points = parseInt(teamStanding.points);
			team.wins = parseInt(teamStanding.wins);
			team.position = parseInt(teamStanding.position);
		}
	});*/

	const data = {
		teams
		/*
		teamsRacePace,
		teamsQualiPace
        */
	};
	cache.set('teams-data-2023', data);
	return data;
}) satisfies PageServerLoad;
