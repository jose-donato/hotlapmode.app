<script lang="ts">
	import clsx from 'clsx';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	const seasons = data.MRData.SeasonTable.Seasons.map((season) => season.season).reverse();
	let season = '';
</script>

<div class="flex justify-center items-center flex-col gap-4">
	<label for="season">Season</label>
	<select name="season" bind:value={season}>
		<option value="" disabled selected>Select a season</option>
		{#each seasons as season}
			<option value={season}>{season}</option>
		{/each}
	</select>
	{#if season}
		<p>Selected season: {season}</p>
	{/if}

	<a
		class={clsx('btn', {
			'btn-primary': season,
			'btn-disabled pointer-events-none': !season
		})}
		href="/experiment/{season}">Go</a
	>
</div>
