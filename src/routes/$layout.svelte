<script lang="ts">
    let sidebarOpen = false;
    const toggleSidebar = () => sidebarOpen = !sidebarOpen

	import "../global.css";
	import Sidebar from '$lib/components/Sidebar.svelte'
	import Main from '$lib/components/Main.svelte'
	import Nav from '$lib/components/Nav.svelte'

	import {drugs} from '$lib/stores/drugs' 
	</script>
 
<style>
div#wrapper {
	@apply flex h-screen bg-gray-100;
}

div#overlay {
	@apply fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden;
	display:none;
}
 
#overlay.sidebar-open {
	display: block;
	@apply lg:hidden;
}
</style>

<div id="wrapper">
	<Sidebar sidebarOpen={sidebarOpen}>
		<Nav items={$drugs} />
	</Sidebar>

    <div id="overlay" class:sidebar-open={sidebarOpen} on:click={toggleSidebar}></div>
	<Main {toggleSidebar}>
		<slot />
	</Main>
</div>
