import { getFaq } from '$lib/server/sanity';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const questions = await getFaq();

	return {
		questions
	};
}) satisfies PageServerLoad;
