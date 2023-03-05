<script lang="ts">
	import clsx from 'clsx';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	// types should be unique values of thread type
	let types = ['all', ...new Set(data.threads.map((thread) => thread.type.toLocaleLowerCase()))];

	let selectedType = 'all';
</script>

<div class="container mx-auto flex justify-center flex-col gap-6">
	<h1 class="text-center text-3xl pb-10">Threads</h1>
	{#if types.length > 1}
		<div class="tabs tabs-boxed lg:mx-auto overflow-auto flex-nowrap">
			{#each types as type}
				<button
					on:click={() => {
						selectedType = type;
					}}
					class={clsx('tab uppercase tab-lg whitespace-nowrap', {
						'tab-active': selectedType === type
					})}>{type}</button
				>
			{/each}
		</div>
	{/if}
	<div class="grid lg:grid-cols-2 items-center gap-10 mx-auto">
		{#each data.threads?.filter((thread) => selectedType === 'all' || thread.type.toLowerCase() === selectedType) as thread}
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
