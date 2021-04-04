<script lang="ts">
  import type { Drug } from "$lib/drugs";
  import { scrollTo } from "$lib/utils";
  import { data } from "$lib/stores/data";

  import { fade, slide } from "svelte/transition";
  import Star20 from "carbon-icons-svelte/lib/Star20";
  import StarFilled20 from "carbon-icons-svelte/lib/StarFilled20";
  export let item: Drug;

  const handleOpen = (e) => {
    const { open, slug } = item;
    data.toggle(item.name);

    e.preventDefault();
    if (open) return;

    requestAnimationFrame(() => {
      const top = document.getElementById(slug).offsetTop;
      scrollTo(top);
      setTimeout(() => scrollTo(top), 200);
    });
  };

  const handleFav = () => {
    data.fav(item.name);
  };
</script>

<li
  class:font-bold={item.important}
  class:open={item.open}
  class:hidden={!item.name.includes($data.filters.name) ||
    !item.chapters.some((chap) => $data.filters.chapters.includes(chap))}
  transition:slide
>
  <a href="#{item.slug}" on:click={handleOpen}>
    {item.name}
  </a>
  <div class="fill" />
  <div class="icon" on:click={handleFav}>
    {#if item.favourite}
      <span transition:fade|local>
        <StarFilled20 />
      </span>
    {:else}
      <span transition:fade|local>
        <Star20 />
      </span>
    {/if}
  </div>
</li>

<style>
  li {
    @apply transition duration-300 p-2 flex w-full;
  }

  li.hidden {
    display: none;
  }

  li.open {
    @apply text-red-400;
  }

  li:hover {
    @apply bg-gray-100;
  }

  a {
    @apply p-1 m-0 mr-4 flex;
    display: blocK;
    height: 100%;
  }

  .fill {
    @apply flex-1;
    cursor: unset;
  }
  div.icon {
    @apply p-1;
    float: right;
    cursor: pointer;
    position: relative;
  }

  .icon span {
    position: absolute;
    @apply right-4;
    top: calc(50% - 10px);
  }
</style>
