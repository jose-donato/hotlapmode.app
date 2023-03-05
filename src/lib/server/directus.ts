import { Directus } from '@directus/sdk';
import { env } from '$env/dynamic/private';

const directus = new Directus(env.DIRECTUS_URL, {
	auth: {
		staticToken: env.DIRECTUS_TOKEN
	}
});

export async function getDirectusClient() {
	return directus;
}

export async function getThreads() {
	const directusThreads = await directus.items('Threads').readByQuery({
		limit: -1,
		filter: {
			status: {
				_eq: 'published'
			}
		},
		sort: ['-created_on']
	});
	return directusThreads.data;
}

export async function getThread(id: number) {
	const directusThread = await directus.items('Threads').readOne(id);
	const recentThreads = await directus.items('Threads').readByQuery({
		limit: 5,
		filter: {
			status: {
				_eq: 'published'
			},
			id: {
				_nin: [id]
			}
		},
		sort: ['-created_on']
	});
	directusThread.recentThreads = recentThreads.data;
	return directusThread;
}

export async function getQuestions() {
	const directusQuestions = await directus.items('Questions').readByQuery({
		limit: -1,
		filter: {
			status: {
				_eq: 'published'
			}
		},
		sort: ['-created_on']
	});
	return directusQuestions.data;
}
