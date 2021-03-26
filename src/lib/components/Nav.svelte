<script lang="ts">
  import type { Drug } from "$lib/data";

  import NavItem from "./NavItem.svelte";
  export let items: Drug[] = [];
</script>

<ul>
  {#each items as item}
    <NavItem {item} />
  {/each}
</ul>

<style>
  ul {
    padding: 0;
    margin: 0;
  }
</style>
