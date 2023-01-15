/**
 *
 * @param {*} quali
 * @param {string} driver
 * @returns {number[]}
 */
export function getDriverQualiValues(quali, driver) {
	let qualiValues = {};
	quali.forEach((circuit) => {
		qualiValues[circuit.Circuit] = parseFloat(circuit[driver]) || circuit[driver];
	});
	return qualiValues;
}

export function getTeamQualiValues(quali, drivers) {
	//break if one of them is invalid
	if (!drivers || drivers.length !== 2) {
		return {};
	}
	const driver1 = drivers[0];
	const driver2 = drivers[1];
	const driver1Quali = getDriverQualiValues(quali, driver1);
	const driver2Quali = getDriverQualiValues(quali, driver2);
	const teamQuali = {};
	Object.keys(driver1Quali).forEach((circuit) => {
		if (!driver1Quali[circuit] || !driver2Quali[circuit]) {
			teamQuali[circuit] = 0;
		} else {
			teamQuali[circuit] = ((driver1Quali[circuit] + driver2Quali[circuit]) / 2).toFixed(2);
		}
	});
	return teamQuali;
}
