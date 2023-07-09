import { createClient } from '@sanity/client';

const client = createClient({
	projectId: 'dsqzfavz',
	dataset: 'production',
	useCdn: true,
	apiVersion: '2023-07-05'
});

export async function getThreads() {
	const sanityThreads = await client.fetch(
		`*[_type == "thread" && status=="published"] | order(_createdAt desc)`
	);

	return sanityThreads;
}

export async function getThread(id: string) {
	const sanityThread = await client.fetch(`*[_type == "thread" && _id == "${id}"]`);
	const recentThreads = await client.fetch(
		`*[_type == "thread" && _id != "${id}" && status=="published"] | order(_createdAt desc) [0...5]`
	);

	sanityThread.recentThreads = recentThreads;

	return sanityThread;
}

export async function getFaq() {
	const sanityFaq = await client.fetch(
		`*[_type == "faq" && status=="published"] | order(_createdAt desc)`
	);

	return sanityFaq;
}
