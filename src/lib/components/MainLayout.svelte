<script lang="ts">
  let sidebarOpen = true;
  const toggleSidebar = () => (sidebarOpen = !sidebarOpen);
  import Sidebar from "$lib/components/Sidebar.svelte";
  import Main from "$lib/components/Main.svelte";
  import Nav from "$lib/components/Nav.svelte";
  import OpenDrugs from "$lib/components/OpenDrugs.svelte";
</script>

<div id="wrapper">
  <Sidebar {sidebarOpen}>
    <Nav />
  </Sidebar>

  <div id="overlay" class:sidebar-open={sidebarOpen} on:click={toggleSidebar} />
  <Main {toggleSidebar}>
    <slot />
  </Main>
  <OpenDrugs />
</div>

<style>
  div#wrapper {
    @apply flex h-screen bg-gray-100;
  }

  div#overlay {
    @apply fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden;
    display: none;
  }

  #overlay.sidebar-open {
    display: block;
    @apply lg:hidden;
  }
</style>
