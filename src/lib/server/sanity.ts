import { createClient } from '@sanity/client';

const client = createClient({
	projectId: 'dsqzfavz',
	dataset: 'production',
	useCdn: false,
	apiVersion: '2023-07-05'
});

export async function getThreads() {
	const sanityThreads = await client.fetch(
		`*[_type == "thread"] | order(_createdAt desc)`
	);

	return sanityThreads;
}

export async function getThread(id: string) {
	const sanityThread = await client.fetch(`*[_type == "thread" && _id == "${id}"]`);
	const recentThreads = await client.fetch(
		`*[_type == "thread" && _id != "${id}"] | order(_createdAt desc) [0...5]`
	);

	sanityThread.recentThreads = recentThreads;

	return sanityThread;
}

export async function getFaq() {
	const sanityFaq = await client.fetch(`*[_type == "faq"] | order(_createdAt desc)`);

	return sanityFaq;
}
