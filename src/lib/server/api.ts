export async function getDriverStandings() {
	const res = await fetch('https://ergast.com/api/f1/2022/22/driverStandings.json');
	const json = await res.json();
	return json.MRData.StandingsTable.StandingsLists[0].DriverStandings;
}

export async function getTeamStandings() {
	const res = await fetch('https://ergast.com/api/f1/2022/22/constructorStandings.json');
	const json = await res.json();
	return json.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
}
