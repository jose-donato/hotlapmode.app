<script>
	import clsx from 'clsx';
	import { toPng } from 'html-to-image';
	import Export from './Export.svelte';

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
	<div class="overflow-x-auto relative">
		<Export
			downloadCsvFn={() => {
				const csv = rows
					.filter((row) => row.Circuit !== 'TOTAL')
					.map((row) => {
						return [row.Circuit, row.driver1, row.driver2, row.Difference].join(',');
					})
					.join('\n');

				const headers = columns.join(',');
				const csvWithHeaders = [headers, csv].join('\n');
				const blob = new Blob([csvWithHeaders], { type: 'text/csv' });
				const url = URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = `table.csv`;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
			}}
			downloadImgFn={() =>
				toPng(document.getElementById('table'), { cacheBust: true })
					.then((dataUrl) => {
						const link = document.createElement('a');
						link.download = 'table.png';
						link.href = dataUrl;
						link.click();
					})
					.catch((err) => {
						console.log(err);
					})}
		/>
		<table class="table table-zebra table-compact w-full" id="table">
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
