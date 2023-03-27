import { env } from '$env/dynamic/private';
import { getDriverStandings } from '$lib/server/api';
import cache from '$lib/server/cache';
import { authenticateSheet, getSheetData } from '$lib/server/sheets';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const cached = cache.get('data-2023');
	if (cached) {
		return cached;
	}
	const doc = await authenticateSheet(env.SPREADSHEET_ID_2023);
	const driversSheet = doc.sheetsByTitle['Driver Details'];
	const drivers = await getSheetData(driversSheet);

	const qualiSheet = doc.sheetsByTitle['(1) Quali In Detail'];
	const quali = await getSheetData(qualiSheet);
	const raceSheet = doc.sheetsByTitle['(1) Race In Detail'];
	const race = await getSheetData(raceSheet);

	const h2hSheet = doc.sheetsByTitle['(hlm.app) H2H'];
	const h2h = await getSheetData(h2hSheet);

	const h2hData = transformH2HArr(h2h.values);

	const driverStandings = await getDriverStandings(2023, 1);

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
		race,
		h2h: h2hData
	};
	cache.set('data-2023', data);
	return data;
}) satisfies PageServerLoad;

function transformH2HArr(arr) {
	const transformedArr = {};
	// create a dict with all drivers as key and an empty object as value
	Object.keys(arr[0]).forEach((key) => {
		if (key.startsWith('Quali')) {
			const [sessionType, driver1, driver2] = key.split('_');
			transformedArr[driver1] = {
				Quali: {},
				Race: {}
			};
			transformedArr[driver2] = {
				Quali: {},
				Race: {}
			};
		}
	});
	Object.keys(arr[0]).forEach((key) => {
		if (key.startsWith('Quali_') || key.startsWith('Race_')) {
			const [sessionType, driver1, driver2] = key.split('_');
			const value = parseInt(arr[0][key]);
			const teammateValue = parseInt(arr[2][key]);
			const diff = parseFloat(arr[1][key]);
			transformedArr[driver1][sessionType] = {
				value,
				diff,
				amFasterThanTeammate: diff < 0,
				teammate: driver2,
				teammateValue
			};
		}
	});
	Object.keys(arr[2]).forEach((key) => {
		if (key.startsWith('Quali_') || key.startsWith('Race_')) {
			const [sessionType, driver1, driver2] = key.split('_');
			const value = parseInt(arr[2][key]);
			const diff = parseFloat(arr[1][key]) * -1;
			const teammateValue = parseInt(arr[0][key]);
			transformedArr[driver2][sessionType] = {
				value,
				diff,
				amFasterThanTeammate: diff < 0,
				teammate: driver1,
				teammateValue
			};
		}
	});
	return transformedArr;
}
