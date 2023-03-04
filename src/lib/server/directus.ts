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
		}
	});
	return directusThreads.data;
}

export async function getThread(id: number) {
	const directusThread = await directus.items('Threads').readOne(id);
	return directusThread;
}

export async function getQuestions() {
	const directusQuestions = await directus.items('Questions').readByQuery({
		limit: -1,
		filter: {
			status: {
				_eq: 'published'
			}
		}
	});
	return directusQuestions.data;
}
