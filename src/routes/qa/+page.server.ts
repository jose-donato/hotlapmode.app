import { getQuestions } from '$lib/server/directus';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const questions = await getQuestions();
	return {
		questions
	};
}) satisfies PageServerLoad;