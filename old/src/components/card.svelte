<script>
	/**
	 * @type {{url: string, name: string}}
	 */
	export let source;

	/**
	 * @type {string}
	 */
	export let title;
</script>

<div class="card">
	<div class="rounded-t flex items-center gap-2 py-0.5 px-1 border-b border-white/10">
		<div class="text-white text-xs">{title}</div>
		{#if source}
			<span>-</span>
			<a href={source.url} class="text-white text-xs underline" target="_blank" rel="noreferrer">
				{source.name}
			</a>
		{/if}
	</div>
	<div class="max-h-[500px] overflow-auto h-full min-h-[300px] text-xs relative">
		<slot />
	</div>
</div>
