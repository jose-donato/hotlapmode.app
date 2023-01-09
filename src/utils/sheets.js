import { env } from '$env/dynamic/private';
import {
	GoogleSpreadsheet,
	GoogleSpreadsheetRow,
	GoogleSpreadsheetWorksheet
} from 'google-spreadsheet';

/**
 * @returns {Promise<GoogleSpreadsheet>}
 * */
export async function authenticateSheet() {
	const doc = new GoogleSpreadsheet(env.SPREADSHEET_ID);
	await doc.useServiceAccountAuth({
		client_email: env.GOOGLE_SHEETS_CLIENT_EMAIL,
		private_key: env.GOOGLE_SHEETS_PRIVATE_KEY.split(String.raw`\n`).join('\n')
	});

	await doc.loadInfo();
	return doc;
}

/**
 * @param {GoogleSpreadsheetWorksheet} sheet
 * @returns {Promise<{values: any[], headerValues: string[]}>}
 **/
export async function getSheetData(sheet) {
	const rows = await sheet.getRows();
	const headerValues = await sheet.headerValues;
	const values = [];
	rows.forEach((row) => {
		const value = {};
		headerValues.forEach((header) => {
			let newHeader =
				header === 'AVG Laptime' ||
				header === 'Quali Time (Lap Time of last Q session both participated in)'
					? 'Circuit'
					: header;
			value[newHeader] = row[header];
		});
		values.push(value);
	});
	return {
		values,
		headerValues
	};
}
