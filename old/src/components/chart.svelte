<script>
	import Chart from 'svelte-frappe-charts';

	export let data;
	console.log(data);
</script>

<Chart
	{data}
	type="line"
	tooltipOptions={{
		formatTooltipX: (d) => (d + '').toUpperCase(),
		formatTooltipY: (d) => (d && typeof d === 'number' ? d.toFixed(2) + '%' : d)
	}}
/>
