import { getThread } from '$lib/server/directus';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const thread = await getThread(params.id);

	if (!thread) {
		throw error(404, 'Not found');
	}
	return thread;
}) satisfies PageLoad;
