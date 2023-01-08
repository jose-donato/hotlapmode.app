<script>
	import clsx from 'clsx';
	export let rows = [];
	export let columns = [];
</script>

<table class="w-full text-xs">
	<thead>
		<tr>
			{#each columns as column}
				<th class="text-left px-4 py-2">{column}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each rows as row, i}
			<tr
				class={clsx({
					'bg-grey-800/40': i % 2 === 0
				})}
			>
				{#each Object.keys(row) as cell}
					<td
						class={clsx('px-4 py-2', {
							'text-white': !row[cell]?.color,
							'text-green-500': row[cell]?.color === 'green',
							'text-red-500': row[cell]?.color === 'red'
						})}>{typeof row[cell] === 'object' ? row[cell].value : row[cell]}</td
					>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
