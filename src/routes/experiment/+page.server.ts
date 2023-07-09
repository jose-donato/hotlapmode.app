import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const res = await fetch('https://ergast.com/api/f1/seasons.json?limit=1000&offset=0');
	const json = await res.json();
	return json;
}) satisfies PageServerLoad;
