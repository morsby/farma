<script>
  import Footer from "./Footer.svelte";
  import CloseFilled20 from "carbon-icons-svelte/lib/CloseFilled20";
  export let toggleSidebar = () => {};
  import { data } from "$lib/stores/data";
  const handleCloseAll = () => {
    open.forEach((d) => data.toggle(d));
  };

  $: open = $data.ids.filter((id) => $data.data.drugs[id].open === true);
  $: anyOpen = open.length > 0;
</script>

<div id="main-wrapper">
  <header>
    <div id="header-top">
      {#if toggleSidebar}
        <button on:click={toggleSidebar} id="sidebar-toggle">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H20M4 18H11"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      {/if}
      <h1><a href="/">farma.morsby.dk</a></h1>
      {#if toggleSidebar && anyOpen}
        <div class="closeAll">
          <button title="Luk alle" on:click={handleCloseAll}
            ><CloseFilled20 /></button
          >
        </div>
      {/if}
    </div>
  </header>

  <main>
    <div class="main-container">
      <slot />
    </div>
    <footer><Footer /></footer>
  </main>
</div>

<style>
  #main-wrapper {
    @apply flex-1 flex flex-col overflow-hidden;
  }

  header {
    @apply flex justify-between items-center p-6 lg:hidden;
  }

  #header-top {
    @apply flex items-center space-x-4 w-full lg:space-x-0;
  }

  #sidebar-toggle {
    @apply text-gray-500 focus:outline-none lg:hidden;
  }

  #sidebar-toggle svg {
    @apply h-6 w-6;
  }

  h1 {
    @apply text-2xl font-medium text-gray-800 flex-1;
  }

  .closeAll {
    @apply sm:block md:hidden;
  }
  .closeAll button {
    @apply text-red-400;
  }

  main {
    @apply flex flex-col overflow-x-hidden overflow-y-auto h-full;
  }

  .main-container {
    @apply container mx-auto px-6 py-4 flex-1;
  }
</style>
