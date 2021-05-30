<script>
  export let sidebarOpen = false;
</script>

<div id="sidebar" class:sidebar-open={sidebarOpen}>
  <div id="sidebar-title">Stofliste</div>

  <a id="sidebar-flashcards" href="/flashcards">Flashcards</a>

  <nav id="sidebar-nav">
    <slot />
  </nav>
</div>

<style>
  div#sidebar {
    @apply fixed z-30 inset-y-0 left-0 w-60 transition duration-300 transform bg-white overflow-y-auto;
    @apply -translate-x-full ease-in;
    @apply shadow-lg;
    @apply lg:static lg:inset-0 lg:translate-x-0;
  }

  div#sidebar.sidebar-open {
    @apply translate-x-0 ease-out;
  }

  div#sidebar-title {
    @apply flex items-center justify-center mt-8;
    @apply text-gray-800 text-2xl font-semibold;
  }

  a#sidebar-flashcards {
    @apply block  mx-6 p-2 rounded-lg border border-red-400 text-black hover:bg-red-400 hover:text-white transition-all duration-300;
    @apply text-center text-black;
  }

  nav#sidebar-nav {
    @apply flex flex-col mt-10 p-0;
  }
</style>
