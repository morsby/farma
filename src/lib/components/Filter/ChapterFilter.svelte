<script lang="ts">
  import { data } from "$lib/stores/data";

  const selectAll = () => data.filter("chapters", $data.chapters);
  const selectNone = () => data.filter("chapters", []);
  const handleClick = (chap: Number) => {
    if ($data.filters.chapters.includes(chap)) {
      data.filter(
        "chapters",
        $data.filters.chapters.filter((c) => c !== chap)
      );
    } else {
      data.filter("chapters", [...$data.filters.chapters, chap]);
    }
  };
</script>

<form>
  {#each $data.chapters as chap (chap)}
    <div class:no-chapter={!chap}>
      <input
        type="checkbox"
        checked={$data.filters.chapters.includes(chap)}
        on:click={() => handleClick(chap)}
        value={chap}
      />
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
