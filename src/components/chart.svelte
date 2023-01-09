<script>
	import Chart from 'svelte-frappe-charts';

	export let data;
	console.log(data);
</script>

<Chart {data} type="line" />
