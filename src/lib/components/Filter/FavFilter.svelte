<script lang="ts">
  import { data } from "$lib/stores/data";

  const handleClick = () => data.filter({ fav: !$data.filters.fav });
</script>

<div>
  <input type="checkbox" checked={$data.filters.fav} on:click={handleClick} />
  <span>Vis kun favoritter</span>
</div>

<style>
  div {
    @apply px-3;
  }
  input {
    @apply rounded;
  }
</style>
