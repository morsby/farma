<script lang="ts">
  import type { Drug } from "$lib/data";
  import { scrollTo } from "$lib/utils";
  import { drugs, filter } from "$lib/stores/drugs";

  import { fade } from "svelte/transition";
  import Star20 from "carbon-icons-svelte/lib/Star20";
  import StarFilled20 from "carbon-icons-svelte/lib/StarFilled20";
  export let item: Drug;

  const handleOpen = (e) => {
    if (!item.body) return;
    const { open, slug } = item;
    drugs.toggle(item.name);

    e.preventDefault();
    if (open) return;

    requestAnimationFrame(() => {
      const top = document.getElementById(slug).offsetTop;
      scrollTo(top);
      setTimeout(() => scrollTo(top), 200);
    });
  };

  const handleFav = () => {
    console.log("favving");
    drugs.fav(item.name);
  };
</script>

{#if item.name.includes($filter)}
  <li class:font-bold={item.important} class:open={item.open}>
    <a href="#{item.slug}" class:noInfo={!item.body} on:click={handleOpen}>
      {item.name}
    </a>
    <div class="fill" />
    <div class="icon" on:click={handleFav}>
      {#if item.favourite}
        <span transition:fade>
          <StarFilled20 />
        </span>
      {:else}
        <span transition:fade>
          <Star20 />
        </span>
      {/if}
    </div>
  </li>
{/if}

<style>
  li {
    @apply transition duration-300 p-2 flex w-full;
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
  a.noInfo {
    cursor: default;
    @apply text-gray-400;
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
