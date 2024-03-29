export interface Drug {
  name: string;
  important: 0 | 1;
  chapters: number[];
  hasInfo: 0 | 1;
  sorting: string;
  slug: string;
  date: string;
  body: string;
  open?: boolean;
  favourite?: boolean;
}

export interface Chapter {
  value: number;
  name?: string;
}

export interface DrugResponse {
  length: number;
  data: Drug[];
}

import { promises as fs } from "fs";
import matter from "gray-matter";
import marked from "marked";

export const parseMd = async (path: string): Promise<any> => {
  const dir = await fs.readdir(path);
  const drugs = await Promise.all(
    dir.map(async (file) => {
      const content = await fs.readFile(`${path}/${file}`);
      const md = matter(content);
      return {
        ...md.data,
        body: marked(md.content),
      };
    })
  );
  return drugs;
};
