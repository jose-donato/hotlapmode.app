<script lang="ts">
	import clsx from 'clsx';
	export let team;
	async function callApi(url: string) {
		const response = await fetch('/api?url=' + url);
		const data = await response.json();
		return data.base64;
	}
</script>

<div class="lg:w-72 flex flex-col justify-center items-center">
	{#if team['Team Logo'].includes('https://')}
		{#await callApi(team['Team Logo'])}
			<div class="w-40 h-20" />
		{:then src}
			<img {src} class="w-40 h-20 object-cover" alt="team" />
		{/await}
	{:else}
		<img src={team['Team Logo']} class="w-20 h-20 object-cover" alt="driver" />
	{/if}
	<div class="flex justify-center h-20 gap-10">
		<div class="flex flex-col justify-center">
			<h1 class="text-center text-sm lg:text-xl font-bold tracking-wide">{team.Team}</h1>
			<h2 class="text-center">{team['2022 Challenger Name']}</h2>
		</div>
	</div>
	<div class="text-center uppercase text-sm lg:text-xl font-bold space-y-2">
		<!--
		<p
			class={clsx({
				'text-green-500': qualiPaceDriver.ahead.diff < 0,
				'text-red-500': qualiPaceDriver.ahead.diff > 0
			})}
		>
			{qualiPaceDriver.avg}%
		</p>
		<p
			class={clsx({
				'text-green-500': qualiPaceDriver.ahead.diff < 0,
				'text-red-500': qualiPaceDriver.ahead.diff > 0,
				'text-white': qualiPaceDriver.ahead.diff === 0
			})}
		>
			{qualiPaceDriver.ahead.amount}
		</p>

		<p
			class={clsx({
				'text-green-500': racePaceDriver.ahead.diff < 0,
				'text-red-500': racePaceDriver.ahead.diff > 0
			})}
		>
			{racePaceDriver.avg}%
		</p>
		<p
			class={clsx({
				'text-green-500': racePaceDriver.ahead.diff < 0,
				'text-red-500': racePaceDriver.ahead.diff > 0,
				'text-white': racePaceDriver.ahead.diff === 0
			})}
		>
			{racePaceDriver.ahead.amount}
		</p>-->
		<p
			class={clsx({
				'text-green-500': team.wins.diff > 0,
				'text-red-500': team.wins.diff < 0
			})}
		>
			{team.wins.value}
		</p>
		<p
			class={clsx({
				'text-green-500': team.position.diff > 0,
				'text-red-500': team.position.diff < 0
			})}
		>
			{team.position.value}
		</p>
		<p
			class={clsx({
				'text-green-500': team.points.diff > 0,
				'text-red-500': team.points.diff < 0
			})}
		>
			{team.points.value}
		</p>
	</div>
</div>
