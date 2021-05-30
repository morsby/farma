<script lang="ts">
  import { slide } from "svelte/transition";

  import type { Drug } from "$lib/parseMd";
  import { data } from "$lib/stores/data";

  export let drug: Drug;
  let prevDrug: Drug = {
    name: "",
    important: 0,
    chapters: [],
    hasInfo: 0,
    sorting: "",
    slug: "",
    date: "",
    body: "",
  };
  const handleClose = () => data.toggle(drug.name);

  export let flashcard = false;
  let visible = !flashcard;
  $: {
    if (prevDrug.name !== drug.name) {
      visible = !flashcard;
    }
  }

  const handleMinimize = () => (visible = !visible);
</script>

<article id={drug.slug} transition:slide|local>
  <h2 class:important={drug.important}>{drug.name}</h2>
  {#if visible}
    <section transition:slide|local>
      <ul>
        {#each drug.chapters.sort((a, b) => a - b) as chap (chap)}
          <li>{chap ? "Kap. " + chap : "Intet kapitel"}</li>
        {/each}
      </ul>
      <div class="date">
        Opdateret {new Date(drug.date).toLocaleDateString()}
      </div>

      <div>
        {#if drug.body}
          {@html drug.body}
        {:else}
          <p>
            <strong>
              Der er desværre ingen oplysninger... Vil du skrive nogle noter?
            </strong>
          </p>
        {/if}
      </div>
    </section>
  {/if}

  <footer>
    {#if !flashcard}
      <button on:click={handleClose}>Luk &#x2715</button>
    {/if}
    <button on:click={handleMinimize}>{visible ? "Skjul –" : "Vis +"}</button>
  </footer>
</article>

<style>
  article {
    @apply bg-white my-6 p-6 rounded-lg shadow-lg;
  }

  h2 {
    @apply text-xl mb-2;
  }

  h2.important {
    @apply font-bold;
  }
  ul {
    @apply mb-2;
  }
  li {
    display: inline-block;
    @apply py-1 px-3 mr-1 bg-red-400 rounded-xl;
    @apply text-sm text-white;
  }

  div.date {
    @apply mb-3 text-sm;
  }

  button {
    @apply bg-red-400 rounded-xl py-1 px-2;
    @apply text-sm text-white;
  }

  article :global(a) {
    @apply text-red-400;
  }
</style>
