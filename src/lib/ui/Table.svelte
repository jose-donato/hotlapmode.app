<script>
	import clsx from 'clsx';

	export let rows = [];
	export let columns = [];

	rows = rows.map((row) => {
		const newRow = {};
		columns.forEach((column) => {
			newRow[column] = row[column];
		});
		return newRow;
	});
</script>

{#if !rows}
	<div class="text-center text-white text-sm">No data</div>
{:else}
	<div class="overflow-auto relative max-h-[300px] lg:min-h-[400px] lg:max-h-[570px]">
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
							<td
								class={clsx({
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
	</div>
{/if}
