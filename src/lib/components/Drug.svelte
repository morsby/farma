<script lang="ts">
  import { slide } from "svelte/transition";

  import type { Drug } from "$lib/data";
  import { drugs } from "$lib/stores/drugs";
  import NavItem from "./NavItem.svelte";
  export let drug: Drug;
  const handleClose = () => drugs.toggle(drug.name);

  let visible = true;
  const handleMinimize = () => (visible = !visible);
</script>

<article id={drug.slug} transition:slide>
  <h2 class:important={drug.important}>{drug.name}</h2>
  {#if visible}
    <section transition:slide|local>
      <ul>
        {#each drug.chapters.sort((a, b) => a - b) as chap}
          <li>{chap ? "Kap. " + chap : "Intet kapitel"}</li>
        {/each}
      </ul>

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
    <button on:click={handleClose}>Luk &#x2715</button>
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

  button {
    @apply bg-red-400 rounded-xl py-1 px-2;
    @apply text-sm text-white;
  }

  article :global(a) {
    @apply text-red-400;
  }
</style>
