import { env } from '$env/dynamic/private';
import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet';

export async function authenticateSheet() {
	const doc = new GoogleSpreadsheet(env.SPREADSHEET_ID);
	await doc.useServiceAccountAuth({
		client_email: env.GOOGLE_SHEETS_CLIENT_EMAIL,
		private_key: env.GOOGLE_SHEETS_PRIVATE_KEY.split(String.raw`\n`).join('\n')
	});

	await doc.loadInfo();
	return doc;
}

type anyType = {
	[key: string]: string;
};

export async function getSheetData(sheet: GoogleSpreadsheetWorksheet) {
	const rows = await sheet.getRows();
	const headerValues = await sheet.headerValues;
	const values: anyType[] = [];
	rows.forEach((row: anyType) => {
		const value: anyType = {};
		headerValues.forEach((header: string) => {
			const newHeader: string =
				header === 'AVG Laptime' ||
				header === 'Quali Time (Lap Time of last Q session both participated in)'
					? 'Circuit'
					: header;
			value[newHeader] = row[header];
		});
		values.push(value);
	});
	if (values[values.length - 1].Circuit === 'TOTAL') {
		values.pop();
	}
	return {
		values,
		headerValues
	};
}
