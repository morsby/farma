<script context="module" lang="ts">
  export const prerender = true;
  import { data as dataStore } from "$lib/stores/data";
  /**
   * @param {import('@sveltejs/kit).LoadOptions} options
   * @returns {import('@sveltejs/kit').Loaded}
   */

  export async function load({ page, fetch, session, context }) {
    const url = "/drugs.json";
    let res = await fetch(url);

    if (res.ok) {
      const data = await res.json();
      dataStore.fetched(data.data);

      return {};
    }

    return {
      status: res.status,
      error: new Error(`Could not load ${url}`),
    };
  }
</script>

<script lang="ts">
  import Drug from "$lib/components/Drug.svelte";
  import MainLayout from "$lib/components/MainLayout.svelte";
  import { data } from "$lib/stores/data";
</script>

<MainLayout>
  <section>
    {#each $data.ids as id (id)}
      {#if $data.data.drugs[id].open}
        <Drug drug={$data.data.drugs[id]} />
      {/if}
    {/each}
  </section>
</MainLayout>
