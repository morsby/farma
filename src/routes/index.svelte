<script context="module" lang="ts">
	export const prerender = true;
	import {drugs} from '$lib/stores/drugs' 
	/**
	 * @param {import('@sveltejs/kit).LoadOptions} options
	 * @returns {import('@sveltejs/kit').Loaded}
	 */
	 
	export async function load({ page, fetch, session, context }) {
		const url = "/drugs.json"; 
		let res = await fetch(url);
		
		if (res.ok) {	 
			const data = await res.json()
			drugs.fetched(data.data)

			return {}
		} 
		
		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	} 
</script>

<script lang="ts">
	import {drugs as drugsStore} from '$lib/stores/drugs'
</script>

<main>


	<p>Der er {$drugs.length} stoffer på listen.</p>
	
	<ul>
		{#each $drugsStore as drug (drug.name)}
			{#if drug.open}
				<li>{drug.name}</li>
			{/if}
		{/each}
	</ul>

</main>
