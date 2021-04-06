import { parseMd } from "$lib/parseMd";
/**
 * @param {import('@sveltejs/kit').Request} request
 * @param {any} context
 * @returns {import('@sveltejs/kit').Response}
 */
export async function get(request, context) {
  const pages = await parseMd(`src/lib/pages`);

  return {
    body: pages,
  };
}
