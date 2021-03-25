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
	import type {Response} from './drugs.json'
	export let drugs: Response = {length:0, data:[]};
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
