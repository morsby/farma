<script context="module" lang="ts">
  import { data as dataStore, getDrugs } from "$lib/stores/data";
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
  import type { Drug as DrugType } from "$lib/parseMd";
  import { shuffle } from "$lib/utils";
  import { onDestroy } from "svelte";

  let drugs: DrugType[] = [];
  const getAndShuffleDrugs = () =>
    (drugs = shuffle(
      getDrugs($data.ids, $data).filter((d) =>
        d.chapters.some((chap) => $data.filters.chapters.includes(chap))
      )
    ));

  const unsubscribe = data.subscribe(() => getAndShuffleDrugs());
  onDestroy(unsubscribe);

  let index = 0;
  const nextDrug = () => {
    index = index + 1;
  };
  $: drug = drugs[index];
</script>

<MainLayout sidebars={false}>
  <h1>Flashcards</h1>
  <div>
    <ChapterFilter cols={8} />
  </div>

  {#if index >= drugs.length}
    <p>Du har nu været igennem alle spørgsmål i de valgte kapitler.</p>
  {:else if drug}
    <Drug {drug} flashcard={true} />
  {/if}

  <button on:click={nextDrug}>Næste stof!</button>
</MainLayout>

<style>
  h1 {
    @apply text-2xl text-center text-red-400;
  }
</style>
