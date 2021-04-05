<script lang="ts">
  import DownToBottom32 from "carbon-icons-svelte/lib/DownToBottom32";
  import { slide } from "svelte/transition";
  import { data } from "$lib/stores/data";
  let open = false;
  const toggle = () => (open = !open);
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

<div class="toggle" on:click={toggle}>
  Filtrer efter kapitler<br />
  <span class="icon" class:open>
    <DownToBottom32 />
  </span>
</div>
{#if open}
  <div transition:slide>
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
    <div class="buttons">
      <button on:click={selectAll}>Vælg alle</button>
      <button on:click={selectNone}>Fravælg alle</button>
    </div>
  </div>
{/if}

<style>
  button,
  div.toggle {
    @apply rounded bg-gray-100 hover:bg-gray-200 transition p-2 text-center cursor-pointer;
  }

  span.icon {
    @apply inline-block m-auto text-center transition-all;
  }

  span.icon.open {
    transform: rotate(180deg);
  }
  div.buttons {
    @apply m-2 flex justify-between;
  }
  .toggle {
    @apply w-full py-3 my-2 rounded-none;
  }
  form {
    @apply grid grid-cols-4 px-3;
  }

  div {
    order: 1;
  }
  div.no-chapter {
    @apply col-span-4 mt-2;
    order: 2;
  }

  input {
    @apply h-6 w-6 rounded;
  }
</style>
