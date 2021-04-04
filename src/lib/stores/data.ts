import type { Chapter, Drug } from "$lib/drugs";
import { writable } from "svelte/store";

let favourites = {};
if (typeof localStorage !== "undefined") {
  favourites = JSON.parse(localStorage.getItem("favourites") || "{}");
}

let open = {};
if (typeof localStorage !== "undefined") {
  open = JSON.parse(localStorage.getItem("open") || "{}");
}

export interface DrugStore {
  ids: string[]; // drug ids = drug names
  chapters: number[]; // chapter ids = chapter values
  data: {
    drugs: { [key: string]: Drug };
    chapters: { [key: number]: Chapter };
  };
  filters: {
    chapters: Number[];
    name: string;
  };
}
const initial: DrugStore = {
  ids: [],
  chapters: [],
  data: {
    drugs: {},
    chapters: {},
  },
  filters: {
    chapters: [],
    name: "",
  },
};
const normaliseData = (data: Drug[]): DrugStore => {
  let normalised: DrugStore = { ...initial };
  data.map((drug) => {
    normalised.ids.push(drug.name);
    normalised.data.drugs[drug.name] = drug;

    drug.chapters.map((chap) => {
      if (chap === null) {
        chap = 0;
      }
      normalised.data.chapters[Number(chap)] = { value: Number(chap) };
    });
    normalised.chapters = Object.keys(normalised.data.chapters)
      .map((str) => Number(str))
      .sort((a, b) => {
        if (a === 0) return b;
        if (b === 0) return a;
        return a - b;
      });
  });

  return normalised;
};

function createData() {
  const { subscribe, set, update } = writable(initial);

  const fetched = (data: Drug[]) => {
    const storeData = normaliseData(data);

    Object.keys(favourites).map(
      (fav) => (storeData.data.drugs[fav].favourite = favourites[fav])
    );

    Object.keys(open).map(
      (openDrug) => (storeData.data.drugs[openDrug].open = open[openDrug])
    );

    storeData.filters.chapters = [...storeData.chapters];
    set(storeData);
  };

  const fav = (drugName) =>
    update((store) => {
      favourites[drugName] = !favourites[drugName];
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("favourites", JSON.stringify(favourites));
      }

      store.data.drugs[drugName].favourite = favourites[drugName];
      return store;
    });

  const toggle = (drugName) =>
    update((store) => {
      open[drugName] = !open[drugName];
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("open", JSON.stringify(open));
      }
      store.data.drugs[drugName].open = open[drugName];
      return store;
    });

  const filter = (type: "name" | "chapters", value: string | Number[]) =>
    update((store) => {
      if (type === "name") {
        store.filters.name = value as string;
      } else {
        store.filters.chapters = [...value] as Number[];
      }
      return store;
    });

  return {
    subscribe,
    fetched,
    toggle,
    fav,
    filter,
  };
}

export const data = createData();
export const getDrugs = (names: string[], store: DrugStore) =>
  names.map((name) => store.data.drugs[name]);
