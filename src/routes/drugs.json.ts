import { promises as fs } from "fs";
import matter from "gray-matter";
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
      const md = matter.read(`src/lib/drugs/${file}`);
      return {
        ...md.data,
        body: md.content,
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
