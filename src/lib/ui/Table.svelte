<script>
	import clsx from 'clsx';
	export let rows = [];
	export let columns = [];
	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
</script>

{#if !rows}
	<div class="text-center text-white text-sm">No data</div>
{:else}
	<div class="overflow-x-auto">
		<table class="table table-zebra table-compact w-full">
			<thead>
				<tr>
					{#each columns as column}
						<th>{column}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each rows as row, i}
					<tr>
						{#each Object.keys(row) as cell}
							{#if columns.includes(capitalizeFirstLetter(cell))}
								<td
									class={clsx({
										'text-white': !row[cell]?.color,
										'text-green-500': row[cell]?.color === 'green',
										'text-red-500': row[cell]?.color === 'red'
									})}>{typeof row[cell] === 'object' ? row[cell].value : row[cell]}</td
								>
							{/if}
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
