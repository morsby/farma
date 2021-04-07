<script lang="ts">
  export let status;
  export let error;
</script>

<nav>
  <a href="/">Tilbage til forsiden</a>
</nav>
<main>
  <article>
    <h1>{status}</h1>

    <p>{error.message}</p>
  </article>
</main>

<style>
  nav {
    @apply pt-6 px-20;
  }
  main {
    @apply px-20 py-10;
  }

  h1 {
    @apply text-4xl text-center mb-6;
  }

  :global(article a),
  nav a {
    @apply text-red-400;
  }
</style>
