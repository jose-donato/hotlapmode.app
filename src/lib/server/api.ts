export async function getDriverStandings(year = 2022, round = 22) {
	const res = await fetch(`https://ergast.com/api/f1/${year}/${round}/driverStandings.json`);
	const json = await res.json();
	return json.MRData.StandingsTable.StandingsLists[0].DriverStandings;
}

export async function getTeamStandings(year = 2022, round = 22) {
	const res = await fetch(`https://ergast.com/api/f1/${year}/${round}/constructorStandings.json`);
	const json = await res.json();
	return json.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
}
