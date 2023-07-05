import { getFaq } from '$lib/server/sanity';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	console.log('load');
	const questions = await getFaq();
	
	console.log(questions);
	return {
		questions
	};
}) satisfies PageServerLoad;