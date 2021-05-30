<script lang="ts">
  export let sidebars = true;
  let sidebarOpen = false;
  const toggleSidebar = () => (sidebarOpen = !sidebarOpen);
  import Sidebar from "$lib/components/Sidebar.svelte";
  import Main from "$lib/components/Main.svelte";
  import DrugList from "$lib/components/DrugList.svelte";
  import OpenDrugs from "$lib/components/OpenDrugs.svelte";
</script>

<div id="wrapper">
  {#if sidebars}
    <Sidebar {sidebarOpen}>
      <DrugList />
    </Sidebar>

    <div
      id="overlay"
      class:sidebar-open={sidebarOpen}
      on:click={toggleSidebar}
    />
  {/if}

  <Main toggleSidebar={sidebars ? toggleSidebar : null}>
    <slot />
  </Main>
  {#if sidebars}
    <OpenDrugs />
  {/if}
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
