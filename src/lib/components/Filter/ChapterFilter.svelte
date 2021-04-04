<script lang="ts">
  import { getChapters, chapterFilter } from "$lib/stores/drugs";

  const selectAll = () => chapterFilter.set(getChapters());
  const selectNone = () => chapterFilter.set([]);
  const select = (chap) => chapterFilter.update(chap);

  $: console.log($chapterFilter);
</script>

<form>
  {#each getChapters() as chap}
    <div class:no-chapter={!chap}>
      <input type="checkbox" bind:group={$chapterFilter} value={chap} />
      <span>{chap || "Intet kapitel"}</span>
    </div>
  {/each}
</form>

<button on:click={selectAll}>Vælg alle</button>
<button on:click={selectNone}>Fravælg alle</button>

<style>
  form {
    @apply grid grid-cols-4 px-3;
  }

  div.no-chapter {
    @apply col-span-4 mt-2;
  }

  input {
    @apply h-6 w-6 rounded;
  }
</style>
