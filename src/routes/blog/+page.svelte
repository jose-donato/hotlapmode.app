<script lang="ts">
	import type { PageServerData } from './$types';
	export let data: PageServerData;
</script>

<div class="container mx-auto flex justify-center flex-col gap-6">
	<h1 class="text-center text-3xl pb-10">Threads</h1>
	<div class="grid lg:grid-cols-2">
		{#each data.threads as thread}
			<div class="card w-96 bg-base-100 shadow-xl border border-white/10">
				<figure>
					<img
						src={`https://nyw3moys.directus.app/assets/${thread.coverImage}`}
						alt="thread cover"
					/>
				</figure>
				<div class="card-body">
					<h2 class="card-title">{thread.title}</h2>
					<p />
					<div class="card-actions justify-end">
						<a href={`/blog/thread/${thread.id}`} class="btn btn-primary">Read more</a>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
