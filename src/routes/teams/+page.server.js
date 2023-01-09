import { authenticateSheet, getSheetData } from '../../utils/sheets';
import cache from '../../utils/cache';
/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const cached = cache.get('data-teams');
	if (cached) {
		return cached;
	}
	const doc = await authenticateSheet();

	const qualiSheet = doc.sheetsByTitle['Quali In Detail'];
	const raceSheet = doc.sheetsByTitle['Race In Detail'];
	const driversSheet = doc.sheetsByTitle['Driver Details'];
	const teamsSheet = doc.sheetsByTitle['Team Details'];

	const drivers = await getSheetData(driversSheet);
	const quali = await getSheetData(qualiSheet);
	const race = await getSheetData(raceSheet);
	const teams = await getSheetData(teamsSheet);

	const data = {
		quali,
		drivers,
		race,
		teams
	};
	cache.set('data-teams', data);
	return data;
}
