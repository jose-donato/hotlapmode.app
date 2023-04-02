import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const year = params.year;
	const race = params.race;
	const res = await fetch(`https://ergast.com/api/f1/${year}/${race}/results.json`);
	const json = await res.json();
	const raceData = json.MRData.RaceTable.Races[0];
	const resLaptimes = await fetch(`https://ergast.com/api/f1/${year}/${race}/laps.json?limit=5000`);
	const jsonLaptimes = await resLaptimes.json();
	const laptimes = jsonLaptimes.MRData.RaceTable.Races[0].Laps;
	raceData.Results.forEach((driver) => {
		driver.laptimes = laptimes.map((lap) => {
			const driverLap = lap.Timings.find((lapTime) => lapTime.driverId === driver.Driver.driverId);
			return driverLap ? convertLaptimeToSeconds(driverLap.time) : null;
		});
	});
	return {
		year,
		race,
		raceData,
		laptimes
	};
}) satisfies PageServerLoad;

function convertLaptimeToSeconds(laptime: string) {
	return parseInt(laptime.split(':')[0]) * 60 + parseFloat(laptime.split(':')[1]);
}
