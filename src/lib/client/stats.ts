export function getDriverValues(data, driver1Name, driver2Name) {
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

export function compareValues(data1, data2) {
	const result = {};
	let driver1Ahead = 0;
	let driver2Ahead = 0;
	let driver1DNFs = 0;
	let driver2DNFs = 0;
	Object.keys(data1).forEach((key) => {
		// check if both are numbers
		if (typeof data1[key] === 'number' && typeof data2[key] === 'number') {
			if (data1[key] < data2[key]) {
				driver1Ahead++;
			} else {
				driver2Ahead++;
			}
			const diff = data1[key] / data2[key] - 1;
			result[key] = diff;
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
	const fasterDriver = avg < 0 ? 'Driver 1' : 'Driver 2';
	return {
		values: result,
		avg,
		driver1:
			fasterDriver === 'Driver 1'
				? (-Math.abs(avg) * 100).toFixed(3)
				: (Math.abs(avg) * 100).toFixed(3),
		driver2:
			fasterDriver === 'Driver 2'
				? (-Math.abs(avg) * 100).toFixed(3)
				: (Math.abs(avg) * 100).toFixed(3),
		fasterDriver,
		driver1DNFs: {
			amount: driver1DNFs,
			percentage: ((driver1DNFs / Object.keys(data1).length) * 100).toFixed(2),
			diff: driver1DNFs - driver2DNFs
		},
		driver2DNFs: {
			amount: driver2DNFs,
			percentage: ((driver2DNFs / Object.keys(data2).length) * 100).toFixed(2),
			diff: driver2DNFs - driver1DNFs
		},
		driver1Ahead: {
			amount: driver1Ahead,
			diff: driver2Ahead - driver1Ahead
		},
		driver2Ahead: {
			amount: driver2Ahead,
			diff: driver1Ahead - driver2Ahead
		}
	};
}
