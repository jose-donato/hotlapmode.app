import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import imageToBase64 from 'image-to-base64';

const getBase64FromUrl = async (url: string) => {
	return new Promise((resolve) => {
		imageToBase64(url).then((base64data: string) => {
			const base64String = `data:image/png;base64,${base64data}`;
			resolve(base64String);
		});
	});
};

export const GET: RequestHandler = async ({ url }) => {
	const urlParam = url.searchParams.get('url') ?? undefined;

	const base64 = await getBase64FromUrl(urlParam);

	return json({
		base64
	});
};
