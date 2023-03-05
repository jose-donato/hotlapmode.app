<script lang="ts">
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	import { parse } from 'marked';
</script>

<div class="flex justify-between flex-col xl:flex-row px-10">
	<div class="container mx-auto flex items-start flex-col gap-6">
		<p>Go back to <a class="link link-primary" href="/blog">blog</a></p>
		<h1 class="text-center xl:text-left text-3xl pb-10 font-bold">{data.title}</h1>
		<img
			class="w-96 object-cover"
			src={`https://nyw3moys.directus.app/assets/${data.coverImage}`}
			alt="thread cover"
		/>

		<article class="prose prose-invert xl:prose-xl">
			{@html parse(data.content)}
		</article>
	</div>
	<div class="xl:sticky">
		<div class="xl:fixed right-10">
			<h2 class="text-2xl font-bold mb-4">Recent Posts</h2>
			<ul class="list-none space-y-5">
				{#each data.recentThreads as thread}
					<div class="card w-96 bg-base-100 shadow-xl border border-white/10">
						<figure>
							<img
								src={`https://nyw3moys.directus.app/assets/${thread.coverImage}`}
								alt="thread cover"
							/>
						</figure>
						<div class="card-body p-2">
							<h2 class="card-title text-sm">{thread.title}</h2>
							<p />
							<div class="card-actions justify-end">
								<a href={`/blog/thread/${thread.id}`} class="btn btn-primary">Read more</a>
							</div>
						</div>
					</div>
				{/each}
			</ul>
		</div>
	</div>
</div>
