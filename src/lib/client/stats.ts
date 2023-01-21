import { browser } from '$app/environment';

export function getTeamValues(data, driver1Name, driver2Name) {
	let values1 = {};
	let values2 = {};
	data.forEach((circuit) => {
		if (circuit.Circuit !== 'TOTAL') {
			values1[circuit.Circuit] = parseFloat(circuit[driver1Name]) || circuit[driver1Name];
			values2[circuit.Circuit] = parseFloat(circuit[driver2Name]) || circuit[driver2Name];
		}
	});
	return [values1, values2];
}

export function getDriverValues(data, driver1Name, driver2Name) {
	let values1 = {};
	let values2 = {};
	let values3 = {};
	const key = Object.keys(data[0]).find((key) => key.includes('_'));

	//const driver1First = key?.indexOf(driver1Name) < key?.indexOf(driver2Name);
	data.forEach((circuit) => {
		if (circuit.Circuit !== 'TOTAL') {
			values1[circuit.Circuit] = parseFloat(circuit[driver1Name]) || circuit[driver1Name];
			values2[circuit.Circuit] = parseFloat(circuit[driver2Name]) || circuit[driver2Name];
			values3[circuit.Circuit] = circuit[key];
		}
	});
	return [values1, values2, values3];
}

const DRIVERS_COMBINATION = new Set();

const TEAMS_COMBINATION = new Set();

export function getAllDriverData(qualiData, raceData, driversData, h2h) {
	const driver1Name = driversData.driver1Data.Driver;
	const driver2Name = driversData.driver2Data.Driver;
	const sameTeamDriver = driversData.driver1Data.Team === driversData.driver2Data.Team;
	const qualiDataValues = compareDriverValues(
		qualiData,
		driver1Name,
		driver2Name,
		sameTeamDriver,
		h2h,
		'Quali'
	);
	const raceDataValues = compareDriverValues(
		raceData,
		driver1Name,
		driver2Name,
		sameTeamDriver,
		h2h,
		'Race'
	);

	const data = {
		qualiDataValues,
		raceDataValues,
		driversData
	};
	if (browser) {
		fetch('/save', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				lineup: `${driver1Name}_${driver2Name}`,
				data
			})
		});
	}
	return data;
}

export function getAllTeamData(qualiData, raceData, teamsData) {
	const team1 = teamsData.team1Data.Team;
	const team2 = teamsData.team2Data.Team;
	const qualiDataValues = compareTeamValues(qualiData, team1, team2, 'Quali');
	const raceDataValues = compareTeamValues(raceData, team1, team2, 'Race');
	const data = {
		qualiDataValues,
		raceDataValues,
		teamsData
	};
	if (browser)
		fetch('/save', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				lineup: `${team1}_${team2}`,
				data,
				team: true
			})
		});
	return data;
}

export function compareDriverValues(
	data,
	driver1Name,
	driver2Name,
	sameTeamDriver,
	h2h,
	sessionType
) {
	// check if the combination was already calculated
	const combination = [...DRIVERS_COMBINATION].find((combination) => {
		return (
			combination.driver1Name === driver1Name &&
			combination.driver2Name === driver2Name &&
			combination.sessionType === sessionType
		);
	});
	if (combination) {
		return combination.result;
	}
	const driverValues = getDriverValues(data, driver1Name, driver2Name);
	const values = compareValues(
		driverValues[0],
		driverValues[1],
		driverValues[2],
		driver1Name,
		driver2Name,
		sameTeamDriver,
		h2h,
		sessionType
	);
	// save lineup to DRIVERS_COMBINATION with the result
	DRIVERS_COMBINATION.add({
		driver1Name,
		driver2Name,
		sessionType,
		result: values
	});
	return values;
}

export function compareTeamValues(data, team1, team2, sessionType) {
	const combination = [...TEAMS_COMBINATION].find((combination) => {
		return (
			combination.team1 === team1 &&
			combination.team2 === team2 &&
			combination.sessionType === sessionType
		);
	});
	if (combination) {
		return combination.result;
	}
	const [data1, data2] = getTeamValues(data, team1, team2);
	const result = {};
	Object.keys(data1).forEach((key) => {
		if (typeof data1[key] === 'number' && typeof data2[key] === 'number') {
			const diff = data1[key] / data2[key] - 1;
			result[key] = diff;
		} else {
			/*if (['DNF', 'none'].includes(data1[key])) {
				team1DNFs++;
			}
			if (['DNF', 'none'].includes(data2[key])) {
				team2DNFs++;
			}*/
			result[key] = null;
		}
	});
	const values = Object.values(result).filter((value) => value !== null);
	const avg = values.reduce((a, b) => a + b, 0) / values.length;
	const fasterTeam = avg < 0 ? 'team1' : 'team2';
	const finalResult = {
		values: result,
		avg,
		team1: {
			faster: fasterTeam === 'team1',
			avg: (avg * 100).toFixed(3)
		},
		team2: {
			faster: fasterTeam === 'team2',
			avg: (avg * 100).toFixed(3)
		}
	};
	TEAMS_COMBINATION.add({
		team1,
		team2,
		sessionType,
		result: finalResult
	});
	return finalResult;
}

export function compareValues(
	data1,
	data2,
	data3,
	driver1Name,
	driver2Name,
	sameTeamDriver,
	h2h,
	sessionType
) {
	const result = {};
	let driver1Ahead = 0;
	let driver2Ahead = 0;
	let driver1DNFs = 0;
	let driver2DNFs = 0;
	let driver1Total = 0;
	let driver2Total = 0;
	Object.keys(data1).forEach((key) => {
		if (typeof data1[key] === 'number' && typeof data2[key] === 'number') {
			if (data3[key] !== 'none') {
				driver1Total = driver1Total + data1[key];
				driver2Total = driver2Total + data2[key];
				if (data1[key] < data2[key]) {
					driver1Ahead++;
				} else {
					driver2Ahead++;
				}
				const diff = data1[key] / data2[key] - 1;
				result[key] = diff;
			}
		} else {
			if (['DNF', 'none'].includes(data1[key])) {
				driver1DNFs++;
			}
			if (['DNF', 'none'].includes(data2[key])) {
				driver2DNFs++;
			}
			result[key] = null;
		}
	});
	const values = Object.values(result).filter((value) => value !== null);
	const avg = values.reduce((a, b) => a + b, 0) / values.length;

	if (sameTeamDriver && h2h) {
		const driver1Data = h2h[driver1Name][sessionType];
		const driver2Data = h2h[driver2Name][sessionType];

		return {
			values: result,
			avg,
			driver1: {
				avg: driver1Data.diff.toFixed(3),
				dnfs: {
					amount: driver1DNFs,
					percentage: ((driver1DNFs / Object.keys(data1).length) * 100).toFixed(2),
					diff: driver1DNFs - driver2DNFs
				},
				ahead: {
					amount: driver1Data.value,
					diff: driver2Data.value - driver1Data.value
				}
			},
			driver2: {
				avg: driver2Data.diff.toFixed(3),
				dnfs: {
					amount: driver2DNFs,
					percentage: ((driver2DNFs / Object.keys(data2).length) * 100).toFixed(2),
					diff: driver2DNFs - driver1DNFs
				},
				ahead: {
					amount: driver2Data.value,
					diff: driver1Data.value - driver2Data.value
				}
			}
		};
	}
	return {
		values: result,
		avg,
		driver1: {
			avg: (avg * 100).toFixed(3),
			dnfs: {
				amount: driver1DNFs,
				percentage: ((driver1DNFs / Object.keys(data1).length) * 100).toFixed(2),
				diff: driver1DNFs - driver2DNFs
			},
			ahead: {
				amount: driver1Ahead,
				diff: driver2Ahead - driver1Ahead
			}
		},

		driver2: {
			avg: (avg * -100).toFixed(3),
			dnfs: {
				amount: driver2DNFs,
				percentage: ((driver2DNFs / Object.keys(data2).length) * 100).toFixed(2),
				diff: driver2DNFs - driver1DNFs
			},
			ahead: {
				amount: driver2Ahead,
				diff: driver1Ahead - driver2Ahead
			}
		}
	};
}
