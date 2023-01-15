import { getDriverStandings, getTeamStandings } from '$lib/server/api';
import cache from '$lib/server/cache';
import { authenticateSheet, getSheetData } from '$lib/server/sheets';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const teamStandings = await getTeamStandings();

	console.log(teamStandings);
}) satisfies PageServerLoad;
