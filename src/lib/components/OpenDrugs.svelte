<script lang="ts">
  import { drugs } from "$lib/stores/drugs";
  import { scrollTo } from "$lib/utils";

  import CloseFilled20 from "carbon-icons-svelte/lib/CloseFilled20";
  import Close20 from "carbon-icons-svelte/lib/Close20";

  const handleClick = (slug) => {
    const top = document.getElementById(slug).offsetTop;
    scrollTo(top);
  };
  const handleClose = (name) => {
    drugs.toggle(name);
  };
  const handleCloseAll = () => {
    open.forEach((d) => drugs.toggle(d.name));
  };

  $: open = $drugs.filter((d) => d.open === true);
  $: anyOpen = open.length > 0;
</script>

<div class="wrapper">
  <div class="header">
    <h3>Åbne stoffer</h3>
    {#if anyOpen}
      <div>
        <button title="Luk alle" on:click={handleCloseAll}
          ><CloseFilled20 /></button
        >
      </div>
    {/if}
  </div>

  <ul>
    {#each $drugs as drug (drug.name)}
      {#if drug.open}
        <li class:important={drug.important}>
          <a
            href={`#${drug.slug}`}
            on:click={(e) => {
              e.preventDefault();
              handleClick(drug.slug);
            }}
          >
            {drug.name}
          </a>
          <button on:click={() => handleClose(drug.name)}><Close20 /></button>
        </li>
      {/if}
    {/each}
  </ul>
</div>

<style>
  div.wrapper {
    @apply w-60 hidden sm:block py-6 px-3 bg-white  shadow-lg overflow-y-auto;
  }

  div.header {
    @apply flex pr-2;
  }
  h3 {
    @apply font-bold flex-1;
  }

  button {
    @apply transition duration-300;
  }
  .header button:hover {
    @apply text-red-400;
  }

  li {
    @apply my-1 px-2 border-l-2 border-solid border-red-400 border-opacity-0 flex;
  }

  li.important {
    @apply font-bold;
  }

  li:hover {
    @apply border-opacity-100 text-black;
  }

  a {
    @apply flex flex-1;
  }

  button {
    @apply text-gray-400;
  }

  button:hover {
    @apply text-black;
  }
</style>
