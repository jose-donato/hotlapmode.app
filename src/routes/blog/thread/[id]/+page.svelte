<script lang="ts">
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	import SvelteMarkdown from 'svelte-markdown';
</script>

<div class="container mx-auto flex justify-center flex-col gap-6">
	<p>Go back to <a class="link link-primary" href="/blog">blog</a></p>
	<h1 class="text-center text-3xl pb-10 font-bold">{data.title}</h1>
	<img
		class="w-96 object-cover mx-auto"
		src={`https://nyw3moys.directus.app/assets/${data.coverImage}`}
		alt="thread cover"
	/>

	<article class="prose prose-invert prose-xl mx-auto">
		<SvelteMarkdown source={data.content} />
	</article>
</div>
