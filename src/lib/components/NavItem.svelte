<script lang="ts">
  import type { Drug } from "$lib/data";
  import { scrollTo } from "$lib/utils";
  import { drugs } from "$lib/stores/drugs";

  export let item: Drug;

  const handleOpen = (e) => {
    if (!item.body) return;
    const { open, slug } = item;
    drugs.toggle(item.name);

    e.preventDefault();
    if (open) return;

    setTimeout(() => {
      const top = document.getElementById(slug).offsetTop;
      scrollTo(top);
    }, 250);
  };
</script>

<li class:font-bold={item.important}>
  <a href="#{item.slug}" class:noInfo={!item.body} on:click={handleOpen}
    >{item.name}</a
  >
</li>

<style>
  li {
    @apply transition duration-300 p-0;
  }

  li:hover {
    @apply bg-gray-100;
  }

  a {
    @apply p-3;
    display: block;
    width: 100%;
    height: 100%;
    margin: 0;
  }

  a.noInfo {
    cursor: default;
    @apply text-gray-400;
  }
</style>
