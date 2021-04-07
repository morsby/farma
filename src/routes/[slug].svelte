<script context="module" lang="ts">
  export const prerender = true;

  export async function load({ page, fetch, session, context }) {
    const url = `/pages.json`;
    let res = await fetch(url);

    if (res.ok) {
      const pages = await res.json();

      const pageToGet = pages.find((p) => p.slug === page.params.slug);
      if (pageToGet) {
        return {
          props: {
            page: pageToGet,
          },
        };
      } else {
        return {
          status: 404,
          error: new Error("Whoops! Siden findes ikke ..."),
        };
      }
    }

    return {
      status: res.status,
      error: new Error(`Could not load ${url}`),
    };
  }
</script>

<script lang="ts">
  export let page;
</script>

<nav>
  <a href="/">Tilbage til forsiden</a>
</nav>
<main>
  <article>
    <h1>{page.title}</h1>

    {@html page.body}
  </article>
  <footer>
    Sidst opdateret {new Date(page.date).toLocaleDateString()}
  </footer>
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

  footer {
    @apply mb-4;
  }

  :global(article a),
  nav a {
    @apply text-red-400;
  }
</style>
