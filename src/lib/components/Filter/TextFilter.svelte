<script lang="ts">
  import { data } from "$lib/stores/data";
  const handleChange = (e) => {
    data.filter("name", e.target.value);
  };
</script>

<form>
  <div>
    <span>
      <svg
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        class="w-6 h-6"
        class:filter={$data.filters.name}
        on:click={() => data.filter("name", "")}
      >
        {#if !$data.filters.name}
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        {:else}
          <path d="M0 0l21 21M21 0l-21 21M21" />
        {/if}
      </svg>
    </span>
    <input
      type="search"
      name="q"
      placeholder="Filtrer efter navn"
      autocomplete="off"
      value={$data.filters.name}
      on:input={handleChange}
    />
  </div>
</form>

<style>
  form {
    @apply px-3;
  }

  div {
    @apply relative text-gray-600 focus-within:text-gray-400;
  }

  span {
    @apply absolute inset-y-0 right-0 flex items-center pl-2 text-red-400;
  }

  svg.filter {
    cursor: pointer;
  }

  input {
    @apply py-2 text-sm text-gray-900 bg-gray-100 rounded-md pl-2 pr-10 max-w-full focus:outline-red;
  }
</style>
