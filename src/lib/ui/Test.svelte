<script>
	export let title = 'Hello world';
</script>

<div class="flex bg-[#2d3748] w-full h-full">
	<h1 class="bg-green-500">{title}</h1>
	<img
		class="image"
		src="https://www.formula1.com/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png.transform/2col-retina/image.png"
		alt="logo"
	/>
</div>

<style>
	.container {
		background-color: #2d3748;
		display: flex;
		width: 100%;
		height: 100%;
	}
	h1 {
		color: red;
	}
	.image {
		width: 100px;
		height: 100px;
	}
</style>
