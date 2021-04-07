<script lang="ts">
  import Favorite16 from "carbon-icons-svelte/lib/Favorite16";
</script>

<article>
  <ul>
    <li><a href="/om">Om siden</a></li>
    <li class="flex-1" />
    <li>
      <div class="inline-icon"><Favorite16 /></div>
      <div>Morsby</div>
    </li>
  </ul>
</article>

<style>
  ul {
    @apply bg-white mt-6 mx-6 mb-0 px-6 py-2 rounded-lg shadow-lg flex;
  }

  li {
    @apply block mx-2 px-2 pr-0 ml-0 text-center;
  }

  li:not(:first-child) {
    @apply border-l;
  }

  li:last-child {
    @apply flex justify-center;
  }
  .inline-icon {
    @apply self-center mr-1;
  }
</style>
