import cache from '$lib/server/cache';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {
	const body = await event.request.json();
	const { lineup, data } = body;

	if (!lineup || !data) {
		console.log('Invalid request');
		return json({ error: 'Invalid request' });
	}

	const cachedData = cache.get(lineup);
	if (cachedData) {
		console.log('Lineup already exists', lineup);
		return json({ error: 'Lineup already exists' });
	}

	console.log('Saving lineup', lineup);
	cache.set(lineup, data);

	return json({ success: true });
};
