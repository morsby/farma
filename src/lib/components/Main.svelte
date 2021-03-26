<script>
  export let toggleSidebar = () => {};
</script>

<div id="main-wrapper">
  <header>
    <div id="header-top">
      <button on:click={toggleSidebar} id="sidebar-toggle">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4 6H20M4 12H20M4 18H11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </header>

  <main>
    <div class="main-container">
      <slot />
    </div>
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
    @apply flex items-center space-x-4 lg:space-x-0;
  }

  #sidebar-toggle {
    @apply text-gray-500 focus:outline-none lg:hidden;
  }

  #sidebar-toggle svg {
    @apply h-6 w-6;
  }

  h1 {
    @apply text-2xl font-medium text-gray-800;
  }

  main {
    @apply flex-1 overflow-x-hidden overflow-y-auto;
  }

  .main-container {
    @apply container mx-auto px-6 py-8;
  }
</style>
