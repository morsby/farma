import { promises as fs } from "fs";
import matter from "gray-matter";
import marked from "marked";

export const parseDrugs = async (path: string) => {
  const dir = await fs.readdir(path);
  const pages = await Promise.all(
    dir.map(async (file) => {
      const content = await fs.readFile(`${path}/${file}`);
      const md = matter(content);
      return {
        ...md.data,
        body: marked(md.content),
      };
    })
  );
  return pages;
};
