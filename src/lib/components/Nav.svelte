<script lang="ts">
    import type {Drug} from '$lib/data'

    import NavItem from './NavItem.svelte'
	export let items:Drug[] = []
</script>

<style>
    ul {
        padding:0;
        margin:0;
    }
</style>

<ul>
    {#each items as item}
    <NavItem {item} />
    {/each}
</ul>