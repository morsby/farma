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
  let index = 0;
  const getAndShuffleDrugs = () => {
    index = 0;
    drugs = shuffle(
      getDrugs($data.ids, $data).filter((d) =>
        d.chapters.some((chap) => $data.filters.chapters.includes(chap))
      )
    );
  };

  const unsubscribe = data.subscribe(() => getAndShuffleDrugs());
  onDestroy(unsubscribe);

  let visible = false;
  const next = () => {
    if (visible) {
      index = index + 1;
    }
    visible = !visible;
  };
  $: drug = drugs[index];

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === " " && index < drugs.length) {
      if ((event.target as HTMLElement).id !== "next") {
        next();
      }
    }
  };
</script>

<svelte:window on:keydown={handleKeydown} />
<MainLayout sidebars={false}>
  <p><a href="/">Tilbage til stoflisten</a>.</p>
  <h1>Flashcards</h1>
  <div>
    <ChapterFilter cols={8} />
  </div>
  <div>
    Du har valgt <strong>{drugs.length}</strong> ud af
    <strong>{$data.ids.length}</strong>
    stoffer og har været igennem <strong>{index}</strong>.
  </div>

  {#if drugs.length === 0}
    <div id="no-drugs">Du skal vælge nogle kapitler ovenfor.</div>
  {:else if index >= drugs.length}
    <div id="no-drugs">
      <p>Du har nu været igennem alle spørgsmål i de valgte kapitler.</p>
      <p>
        Vælg nogle andre/nye kapitler eller <button
          on:click={getAndShuffleDrugs}>prøv igen</button
        >.
      </p>
    </div>
  {:else if drug}
    <Drug {drug} {visible} flashcard={true} />

    <button id="next" on:click={next}>
      {#if visible}
        Videre til næste stof.
      {:else}
        Vis information.
      {/if}
    </button>
  {/if}
</MainLayout>

<style>
  h1 {
    @apply text-2xl text-center text-red-400;
  }

  strong,
  a {
    @apply text-red-400;
  }

  div#no-drugs {
    @apply text-center p-6 my-12 rounded-lg border border-red-400;
  }

  div#no-drugs p:last-child {
    @apply mb-0;
  }

  #no-drugs button {
    @apply text-red-400;
  }

  button#next {
    @apply w-full rounded-lg text-center p-6 text-white hover:text-black bg-red-400 hover:bg-red-300 transition-colors;
  }
</style>
