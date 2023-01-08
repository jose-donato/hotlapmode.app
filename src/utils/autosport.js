import parse from 'node-html-parser';

/**
 * @returns {Promise<{reader: {rank: number, driver: string, score: string}[], autosport: {rank: number, driver: string, score: string}[]}>}
 */
export async function getAutoSportDriverRatings() {
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
