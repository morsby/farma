<script lang="ts">
  import { data, getDrugs } from "$lib/stores/data";
  import NavItem from "./NavItem.svelte";
  import Filter from "./Filter/Filter.svelte";
</script>

<div>
  <Filter />
  <ul>
    {#each getDrugs($data.ids, $data) as item}
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
