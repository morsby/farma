<script context="module" lang="ts">
  import { data as dataStore } from "$lib/stores/data";
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
  import ChapterFilter from "$lib/components/Filter/ChapterFilter.svelte";
</script>

<MainLayout sidebars={false}>
  <div>
    <ChapterFilter cols={8} />
  </div>
  <section>Hej med dig!</section>
</MainLayout>
