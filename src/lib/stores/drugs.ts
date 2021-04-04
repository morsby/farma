import type { Chapter, Drug } from "$lib/data";
import { writable, get } from "svelte/store";

let favourites = {};
if (typeof localStorage !== "undefined") {
  favourites = JSON.parse(localStorage.getItem("favourites") || "{}");
}

let open = {};
if (typeof localStorage !== "undefined") {
  open = JSON.parse(localStorage.getItem("open") || "{}");
}

interface DrugStore {
  ids: string[]; // drug ids = drug names
  chapters: number[]; // chapter ids = chapter values
  data: {
    drugs: { [key: string]: Drug };
    chapters: { [key: number]: Chapter };
  };
}

const normaliseData = (data: Drug[]): DrugStore => {
  const normalised: DrugStore = {
    ids: [],
    chapters: [],
    data: {
      drugs: {},
      chapters: {},
    },
  };

  data.map((drug) => {
    normalised.ids.push(drug.name);
    normalised.data.drugs[drug.name] = drug;

    drug.chapters.map((chap) => {
      normalised.data.chapters[chap] = { value: chap };
    });
    normalised.chapters = Object.keys(normalised.data.chapters).map((str) =>
      Number(str)
    );
  });

  return normalised;
};

function createDrugs() {
  const { subscribe, set, update } = writable([]);

  const fetched = (data: Drug[]) => {
    const drugs = data.map((drug) => {
      drug.open = open[drug.name];
      drug.favourite = favourites[drug.name];
      return drug;
    });

    set(drugs);
  };

  const fav = (drugName) =>
    update((drugs) => {
      const index = drugs.findIndex((drug) => drug.name === drugName);

      favourites[drugName] = !favourites[drugName];
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("favourites", JSON.stringify(favourites));
      }

      drugs[index].favourite = favourites[drugName];
      return drugs;
    });

  const toggle = (drugName) =>
    update((drugs) => {
      const index = drugs.findIndex((drug) => drug.name === drugName);

      open[drugName] = !open[drugName];
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("open", JSON.stringify(open));
      }
      drugs[index].open = open[drugName];
      return drugs;
    });

  return {
    subscribe,
    fetched,
    toggle,
    fav,
  };
}

export const drugs = createDrugs();
export const textFilter = writable("");
export const getChapters = () => {
  const store = get(drugs);
  const chapters = [];
  store.forEach((drug) =>
    drug.chapters.forEach((chap) => {
      if (!chapters.includes(chap)) {
        chapters.push(chap);
      }
    })
  );
  chapters.sort((a, b) => {
    if (a === null) return 1;
    if (b === null) return -1;
    return a - b;
  });
  return chapters;
};
export const chapterFilter = writable(getChapters());
