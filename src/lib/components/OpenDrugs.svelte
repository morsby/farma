<script lang="ts">
  import { drugs } from "$lib/stores/drugs";
  import { scrollTo } from "$lib/utils";

  const handleClick = (slug) => {
    const top = document.getElementById(slug).offsetTop;
    scrollTo(top);
  };
  const handleClose = (name) => {
    drugs.toggle(name);
  };
</script>

<div>
  <h3>Åbne stoffer</h3>

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
          <button on:click={() => handleClose(drug.name)}>&#x2715</button>
        </li>
      {/if}
    {/each}
  </ul>
</div>

<style>
  div {
    @apply w-60 hidden sm:block py-6 px-3 bg-white  shadow-lg overflow-y-auto;
  }
  h3 {
    @apply font-bold;
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
