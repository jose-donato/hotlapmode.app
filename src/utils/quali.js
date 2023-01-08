/**
 *
 * @param {*} quali
 * @param {string} driver
 * @returns {number[]}
 */
export function getDriverQualiValues(quali, driver) {
	let qualiValues = {};
	quali.forEach((circuit) => {
		if (circuit[driver] !== 'none') {
			qualiValues[circuit.Circuit] = parseFloat(circuit[driver]) || 0;
		}
	});
	return qualiValues;
}
