import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { html as toReactElement } from 'satori-html';
import type { RequestHandler } from './$types';
import Test from '$lib/ui/Test.svelte';
import OGImage from '$lib/ui/OG.svelte';
import cache from '$lib/server/cache';
import OgTeam from '$lib/ui/OGTeam.svelte';

const fontFile = await fetch(
	'https://github.com/sorenson/open-sans-woff/raw/master/fonts/Semibold/OpenSans-Semibold.woff'
);
const fontData: ArrayBuffer = await fontFile.arrayBuffer();

const height = 630;
const width = 1200;

export const GET: RequestHandler = async ({ url }) => {
	const lineup = url.searchParams.get('lineup') ?? undefined;
	const team = url.searchParams.get('type') === 'teams' ?? false;
	let result = '';
	if (!lineup) {
		result = OGImage.render();
	}
	const data = cache.get(lineup);
	if (!data) {
		result = OGImage.render();
	} else {
		if (team) {
			result = OgTeam.render({ data });
		} else {
			result = Test.render({ data });
		}
	}
	const html = toReactElement(`${result.html}<style>${result.css.code}</style>`);
	const svg = await satori(html, {
		fonts: [
			{
				name: 'Open Sans',
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
