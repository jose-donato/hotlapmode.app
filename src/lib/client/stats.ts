export function getDriverValues(data, driver1Name, driver2Name) {
	let values1 = {};
	let values2 = {};
	let values3 = {};
	const key = Object.keys(data[0]).find((key) => key.includes('_'));
	// check which driver comes first in key
	//check if both driversNames are on key

	const driver1First = key?.indexOf(driver1Name) < key?.indexOf(driver2Name);
	data.forEach((circuit) => {
		if (circuit.Circuit !== 'TOTAL') {
			values1[circuit.Circuit] = parseFloat(circuit[driver1Name]) || circuit[driver1Name];
			values2[circuit.Circuit] = parseFloat(circuit[driver2Name]) || circuit[driver2Name];
			values3[circuit.Circuit] = circuit[key];
		}
	});
	if (key && key.indexOf(driver1Name) > 0 && key.indexOf(driver2Name) > 0 && !driver1First) {
		[values1, values2] = [values2, values1];
	}
	return [values1, values2, values3];
}

export function compareValues(data1, data2, data3) {
	const result = {};
	let driver1Ahead = 0;
	let driver2Ahead = 0;
	let driver1DNFs = 0;
	let driver2DNFs = 0;
	let driver1Total = 0;
	let driver2Total = 0;
	Object.keys(data1).forEach((key) => {
		// check if both are numbers
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
