import { parseDrugs } from "$lib/drugs";
/**
 * @param {import('@sveltejs/kit').Request} request
 * @param {any} context
 * @returns {import('@sveltejs/kit').Response}
 */
export async function get(request, context) {
  const drugs = await parseDrugs();
  return {
    body: {
      length: drugs.length,
      data: drugs,
    },
  };
}
