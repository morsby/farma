<script context="module" lang="ts">
export const prerender = true;

	/**
	 * @param {import('@sveltejs/kit).LoadOptions} options
	 * @returns {import('@sveltejs/kit').Loaded}
	 */
	 
	export async function load({ page, fetch, session, context }) {
		const url = "/drugs.json"; 
		let res = await fetch(url);
		
		if (res.ok) {	 
			const data = await res.json()
			return {
				props: {
					drugs: data
				}
			};
		} 
		
		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	} 
</script>

<script lang="ts">
	export let drugs = [];
</script>

<main>
	<h1>Hello world!</h1>

	<p>Visit <a class="text-blue-600 underline" href="https://svelte.dev">svelte.dev</a> to learn how to build Svelte apps.</p>

	<p>Der er {drugs.length} stoffer på listen.</p>
	
	{#each drugs.data as drug (drug.name)}
	<ul>
		<li>{drug.name}</li>
		<li>{@html drug.body}</li>
	</ul>
	{/each}
</main>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
	}

	main {
		@apply text-center;
		@apply p-4;
		@apply mx-auto;
	}

	h1 {
		@apply text-red-600;
		@apply uppercase;
		@apply text-6xl;
		@apply font-thin;
		@apply leading-tight;
		@apply my-16 mx-auto;
		@apply max-w-xs;
	}

	p {
		@apply max-w-xs;
		@apply my-8 mx-auto;
		@apply leading-snug;
	}

	@screen sm {
		h1 {
			@apply max-w-none;
		}

		p {
			@apply max-w-none;
		}
	}
</style>
