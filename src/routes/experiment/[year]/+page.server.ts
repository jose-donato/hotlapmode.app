import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const year = params.year;
	const res = await fetch(`https://ergast.com/api/f1/${year}.json`);
	const json = await res.json();
	return {
		...json,
		year
	};
}) satisfies PageServerLoad;
