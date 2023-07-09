import { getThreads } from '$lib/server/sanity';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const threads = await getThreads();
	return {
		threads
	};
}) satisfies PageServerLoad;
