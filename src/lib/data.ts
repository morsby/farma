export interface Drug {
  name: string;
  important: 0 | 1;
  chapters: [number];
  hasInfo: 0 | 1;
  sorting: string;
  slug: string;
  date: string;
  body: string;
  open?: boolean;
}

export interface Response {
  length: number;
  data: Drug[];
}

import { promises as fs } from "fs";
import matter from "gray-matter";
import marked from "marked";

export const parseDrugs = async () => {
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
  return drugs;
};
