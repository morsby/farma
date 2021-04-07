import { DrugResponse, parseMd } from "$lib/parseMd";

export async function get() {
  const drugs: DrugResponse = await parseMd(`src/lib/drugs`);
  return {
    body: {
      length: drugs.length,
      data: drugs,
    },
  };
}
