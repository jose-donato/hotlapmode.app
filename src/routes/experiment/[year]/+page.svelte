<script lang="ts">
	import clsx from 'clsx';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	const races = data.MRData.RaceTable.Races;
	let race = '';
</script>

<div class="flex justify-center items-center flex-col gap-4">
	<label for="race">Race</label>
	<select name="race" bind:value={race}>
		<option value="" disabled selected>Select a race</option>
		{#each races as race}
			<option value={race.round}>{`${race.round}: ${race.raceName}`}</option>
		{/each}
	</select>
	{#if race}
		<p>Selected race: {race}</p>
	{/if}

	<a
		class={clsx('btn', {
			'btn-primary': race,
			'btn-disabled pointer-events-none': !race
		})}
		href={`/experiment/${data.year}/${race}`}>Go</a
	>
</div>
