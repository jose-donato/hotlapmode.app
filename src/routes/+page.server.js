import { getAutoSportDriverRatings } from '../utils/autosport';
import { authenticateSheet, getSheetData } from '../utils/sheets';
import cache from '../utils/cache';
/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const cached = cache.get('data');
	if (cached) {
		return cached;
	}
	const doc = await authenticateSheet();

	const qualiSheet = doc.sheetsById[540387825];
	const raceSheet = doc.sheetsByTitle['RACEFORMAT'];
	const driversSheet = doc.sheetsByTitle['DriversDetails'];

	const drivers = await getSheetData(driversSheet);
	// group drivers by team
	const teams = {};

	drivers.values.forEach((driver) => {
		if (!teams[driver.Team]) {
			teams[driver.Team] = [];
		}
		teams[driver.Team].push(driver);
	});
	drivers.teams = teams;
	const quali = await getSheetData(qualiSheet);
	const race = await getSheetData(raceSheet);

	const autoSportScores = await getAutoSportDriverRatings();

	const data = {
		autoSportScores,
		quali,
		drivers,
		race
	};
	cache.set('data', data);
	return data;
}
