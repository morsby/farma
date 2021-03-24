import { promises as fs } from "fs";
import fm, { FrontMatterResult } from "front-matter";
export interface Drug {
  name: string;
  important: 0 | 1;
  chapters: [number];
  hasInfo: 0 | 1;
  sorting: string;
  slug: string;
  date: string;
}

/**
 * @param {import('@sveltejs/kit').Request} request
 * @param {any} context
 * @returns {import('@sveltejs/kit').Response}
 */
export async function get(request, context) {
  const dir = await fs.readdir(`src/lib/drugs`);
  const drugs = await Promise.all(
    dir.map(async (file) => {
      const content = await fs.readFile(`src/lib/drugs/${file}`, {
        encoding: "utf-8",
      });
      const md: FrontMatterResult<Drug> = fm(content);
      return {
        ...md.attributes,
        body: md.body,
      };
    })
  );
  return {
    body: {
      length: drugs.length,
      data: drugs,
    },
  };
}
