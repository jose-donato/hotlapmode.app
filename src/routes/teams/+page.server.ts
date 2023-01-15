import { getTeamStandings } from '$lib/server/api';
import cache from '$lib/server/cache';
import { authenticateSheet, getSheetData } from '$lib/server/sheets';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const cached = cache.get('teams-data');
	if (cached) {
		return cached;
	}
	const doc = await authenticateSheet();
	const teamsSheet = doc.sheetsByTitle['Team Details'];
	const teamsRacePaceSheet = doc.sheetsByTitle['Team Best Pace'];

	const teams = await getSheetData(teamsSheet);
	const teamsRacePace = await getSheetData(teamsRacePaceSheet);

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
	});

	const data = {
		teams,
		teamsRacePace
	};
	cache.set('teams-data', data);
	return data;
}) satisfies PageServerLoad;
