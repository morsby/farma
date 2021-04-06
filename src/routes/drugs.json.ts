import { DrugResponse, parseMd } from "$lib/parseMd";
/**
 * @param {import('@sveltejs/kit').Request} request
 * @param {any} context
 * @returns {import('@sveltejs/kit').Response}
 */
export async function get(request, context) {
  const drugs: DrugResponse = await parseMd(`src/lib/drugs`);
  return {
    body: {
      length: drugs.length,
      data: drugs,
    },
  };
}
