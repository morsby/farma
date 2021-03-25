<script lang="ts">
import type { Drug } from "$lib/data";

import {drugs} from '$lib/stores/drugs'

export let item:Drug
</script>

<style>
    li {
        @apply p-3 transition duration-300
    }

    li:hover {
        @apply bg-gray-100;
        cursor:pointer;
    }
</style>

<li class:font-bold={item.important === 1} on:click={() => drugs.toggle(item.name)}>
    {item.name} {#if item.open}+{/if}
</li>