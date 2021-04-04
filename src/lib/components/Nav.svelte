<script lang="ts">
  import type { Drug } from "$lib/data";
  import NavItem from "./NavItem.svelte";
  import Filter from "./Filter/Filter.svelte";
  export let items: Drug[] = [];
</script>

<div>
  <Filter />
  <ul>
    {#each items as item}
      <NavItem {item} />
    {/each}
  </ul>
</div>

<style>
  ul {
    padding: 0;
    margin: 0;
  }
</style>
