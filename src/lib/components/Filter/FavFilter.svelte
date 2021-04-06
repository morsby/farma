<script lang="ts">
  import { data } from "$lib/stores/data";

  const handleClick = () => data.filter({ fav: !$data.filters.fav });
</script>

<div on:click={handleClick}>
  <input type="checkbox" checked={$data.filters.fav} />
  <span>Vis kun favoritter</span>
</div>

<style>
  div {
    @apply px-3;
    cursor: pointer;
  }
  input {
    @apply rounded;
  }
</style>
