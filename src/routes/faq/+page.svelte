<script lang="ts">
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	import { parse } from 'marked';
</script>

<div class="container mx-auto flex justify-center flex-col gap-6">
	<h1 class="text-center text-3xl pb-10">Frequently Asked Questions</h1>

	<div class="container mx-auto flex justify-center flex-col gap-6">
		{#each data.questions as question}
			<div
				tabindex="0"
				class="collapse collapse-arrow border border-base-300  bg-base-100 rounded-box border border-white/40 shadow-lg"
			>
				<input type="checkbox" />
				<div class="collapse-title text-xl font-medium">
					{question.question}
				</div>
				<div class="collapse-content prose prose-invert">
					{@html parse(question.answer)}
				</div>
			</div>
		{/each}
	</div>
</div>
