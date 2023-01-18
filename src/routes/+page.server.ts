import { getDriverStandings } from '$lib/server/api';
import cache from '$lib/server/cache';
import { authenticateSheet, getSheetData } from '$lib/server/sheets';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	/*const cached = cache.get('data');
	if (cached) {
		return cached;
	}*/
	const doc = await authenticateSheet();
	const driversSheet = doc.sheetsByTitle['Driver Details'];

	const qualiSheet = doc.sheetsByTitle['Quali In Detail'];
	const raceSheet = doc.sheetsByTitle['Race In Detail'];

	const drivers = await getSheetData(driversSheet);
	const quali = await getSheetData(qualiSheet);
	const race = await getSheetData(raceSheet);

	const driverStandings = await getDriverStandings();

	// iterate through drivers and add driverStandings
	drivers.values.forEach((driver: any) => {
		const driverStanding = driverStandings.find((standing: any) =>
			standing.Driver.driverId.toLowerCase().includes(driver.Driver.toLowerCase())
		);
		if (driverStanding) {
			driver.position = parseInt(driverStanding.position);
			driver.points = parseInt(driverStanding.points);
			driver.wins = parseInt(driverStanding.wins);
		}
	});

	const data = {
		drivers,
		quali,
		race
	};
	cache.set('data', data);
	return data;
}) satisfies PageServerLoad;
