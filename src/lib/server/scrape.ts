import { parse } from 'node-html-parser';

export async function getAutoSportDriverRatings(): Promise<{
	reader: { rank: number; driver: string; score: string }[];
	autosport: { rank: number; driver: string; score: string }[];
}> {
	const autoSportScores = {
		reader: [],
		autosport: []
	};
	const html = await fetch('https://www.autosport.com/f1/driver-ratings/?y=2021');
	const text = await html.text();
	const root = parse(text);
	const tables = root.querySelectorAll('.ms-table.ms-table--result');
	tables.forEach((table, idx) => {
		const rows = table.querySelectorAll('tr');
		rows.forEach((row, idx2) => {
			const cells = row.querySelectorAll('td');
			if (cells.length === 3) {
				const driver = cells[1].text;
				const score = cells[2].text;
				autoSportScores[idx === 0 ? 'reader' : 'autosport'].push({
					rank: idx2,
					driver,
					score
				});
			}
		});
	});
	return autoSportScores;
}

export async function getDriverStandings(): Promise<
	{ rank: number; driver: string; points: string }[]
> {
	const html = await fetch('https://www.formula1.com/en/results.html/2021/drivers.html');
	const text = await html.text();
	const root = parse(text);
	const table = root.querySelector('.resultsarchive-table');
	const rows = table.querySelectorAll('tr');
	const driverStandings = [];
	rows.forEach((row, idx) => {
		const cells = row.querySelectorAll('td');
		if (cells.length === 7) {
			const driver = cells[1].text;
			const points = cells[5].text;
			driverStandings.push({
				rank: idx,
				driver,
				points
			});
		}
	});
	return driverStandings;
}

export async function getTeamStandings(): Promise<
	{ rank: number; team: string; points: string }[]
> {
	const html = await fetch('https://www.formula1.com/en/results.html/2021/teams.html');
	const text = await html.text();
	const root = parse(text);
	const table = root.querySelector('.resultsarchive-table');
	const rows = table.querySelectorAll('tr');
	const teamStandings = [];
	rows.forEach((row, idx) => {
		const cells = row.querySelectorAll('td');
		if (cells.length === 7) {
			const team = cells[1].text;
			const points = cells[5].text;
			teamStandings.push({
				rank: idx,
				team,
				points
			});
		}
	});
	return teamStandings;
}
