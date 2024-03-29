const sveltePreprocess = require("svelte-preprocess");
const netlify = require("@sveltejs/adapter-netlify");
const pkg = require("./package.json");

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    sveltePreprocess({
      defaults: {
        style: "postcss",
      },
      postcss: true,
    }),
  ],
  kit: {
    // By default, `npm run build` will create a standard netlify app.
    // You can create optimized builds for different platforms by
    // specifying a different adapter
    adapter: netlify(),

    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",

    vite: {
      ssr: {
        //noExternal: Object.keys(pkg.dependencies || {}),
        //external: ["gray-matter"],
      },
    },
  },
};
