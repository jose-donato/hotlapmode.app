import { getThreads } from '$lib/server/directus';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const threads = await getThreads();
	return {
		threads
	};
}) satisfies PageServerLoad;
