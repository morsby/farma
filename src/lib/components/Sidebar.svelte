<script>
  export let sidebarOpen = true;
</script>

<div id="sidebar" class:sidebar-open={sidebarOpen}>
  <div id="sidebar-title">Stofliste</div>
  <nav id="sidebar-nav">
    <slot />
  </nav>
</div>

<style>
  div#sidebar {
    @apply fixed z-30 inset-y-0 left-0 w-60 transition duration-300 transform bg-white overflow-y-auto lg:translate-x-0 lg:static lg:inset-0 lg:translate-x-0;
    @apply -translate-x-full ease-in;
    @apply shadow-lg;
  }

  div#sidebar.sidebar-open {
    @apply translate-x-0 ease-out;
  }

  div#sidebar-title {
    @apply flex items-center justify-center mt-8;
    @apply text-gray-800 text-2xl font-semibold;
  }

  nav#sidebar-nav {
    @apply flex flex-col mt-10 p-0;
  }
</style>
