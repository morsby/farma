<script lang="ts">
  import ChapterFilter from "./ChapterFilter.svelte";
  import TextFilter from "./TextFilter.svelte";
  import FavFilter from "./FavFilter.svelte";
</script>

<div>
  <TextFilter />
  <ChapterFilter />
  <FavFilter />
</div>

<style>
  div {
    @apply pb-3 mb-3 border-b border-gray-100;
  }
</style>
