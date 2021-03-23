import { promises as fs } from "fs";
import fm, { FrontMatterResult } from "front-matter";
/**
 * @param {import('@sveltejs/kit').Request} request
 * @param {any} context
 * @returns {import('@sveltejs/kit').Response}
 */
export async function get(request, context) {
  const drugs = [];
  const dir = await fs.readdir(`src/lib/drugs`);
  await Promise.all(
    dir.map(async (file) => {
      interface Drug {
        name: string;
        important: 0 | 1;
        chapters: [number];
        hasInfo: 0 | 1;
        sorting: string;
        slug: string;
        date: string;
      }
      const content = await fs.readFile(`src/lib/drugs/${file}`, { encoding: "utf-8" });
      const md: FrontMatterResult<Drug> = fm(content);
      const drug = {
        ...md.attributes,
        body: md.body,
      };
      drugs.push(drug);
    })
  );

  // the `slug` parameter is available because this file
  // is called [slug].json.js
  const { slug } = request.params;

  if (true) {
    return {
      body: {
        drugs,
      },
    };
  }
}
