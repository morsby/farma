import { promises as fs } from "fs";
import matter from "gray-matter";
import marked from "marked";
export interface Drug {
  name: string;
  important: 0 | 1;
  chapters: [number];
  hasInfo: 0 | 1;
  sorting: string;
  slug: string;
  date: string;
  body: string;
}

export interface Response {
  length: number;
  data: Drug[];
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
      const content = await fs.readFile(`src/lib/drugs/${file}`);
      const md = matter(content);
      return {
        ...md.data,
        body: marked(md.content),
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
