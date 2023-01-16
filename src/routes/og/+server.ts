import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { html as toReactElement } from 'satori-html';
import type { RequestHandler } from './$types';
import Test from '$lib/ui/Test.svelte';

const fontFile = await fetch('https://og-playground.vercel.app/inter-latin-ext-700-normal.woff');
const fontData: ArrayBuffer = await fontFile.arrayBuffer();

const height = 630;
const width = 1200;

export const GET: RequestHandler = async ({ url }) => {
	const title = url.searchParams.get('title') ?? undefined;
	const result = Test.render({ title });
	const html = toReactElement(`${result.html}<style>${result.css.code}</style>`);
	const svg = await satori(html, {
		fonts: [
			{
				name: 'Inter Latin',
				data: fontData,
				style: 'normal'
			}
		],
		height,
		width
	});

	const resvg = new Resvg(svg, {
		fitTo: {
			mode: 'width',
			value: width
		}
	});

	const image = resvg.render();

	return new Response(image.asPng(), {
		headers: {
			'content-type': 'image/png'
		}
	});
};
