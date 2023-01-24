import { getQuestions } from '$lib/server/directus';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const Questions = await getQuestions();
	return {
		Questions
	};
}) satisfies PageServerLoad;