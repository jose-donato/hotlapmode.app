<script lang="ts">
	export let downloadCsvFn: () => void;
	export let downloadImgFn: () => void;
</script>

<div class="absolute top-0 right-2 flex gap-2 z-10">
	<div class="dropdown">
		<label tabindex="0" class="btn m-1 border-grey-300/20 border">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width={1.5}
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
				/>
			</svg>
		</label>
		<ul
			tabindex="0"
			class="dropdown-content menu p-2 shadow bg-base-100 rounded-box !w-52 space-y-2"
		>
			<li>
				<button class="_icon-btn z-10" on:click={downloadImgFn}> PNG </button>
			</li>
			<li>
				<button class="_icon-btn z-10" on:click={downloadCsvFn}> CSV </button>
			</li>
		</ul>
	</div>
</div>
