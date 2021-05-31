import type { Chapter, Drug } from "$lib/parseMd";
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
    fav: boolean;
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
    fav: false,
  },
};
const normaliseData = (data: Drug[]): DrugStore => {
  let normalised: DrugStore = JSON.parse(JSON.stringify(initial));

  data.map((drug) => {
    // convert chapter to a number; if NULL make it 0
    // also save the chap into the DrugStore
    drug.chapters = drug.chapters.map((chap) => {
      if (chap === null) {
        chap = 0;
      }
      chap = Number(chap);
      normalised.data.chapters[chap] = { value: chap };
      return chap;
    });

    // save the drug
    normalised.ids.push(drug.name);
    normalised.data.drugs[drug.name] = drug;

    // sort the DrugStore's chapters; setting 0 (no chapter) in the end
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

  const filter = (options: {
    name?: string;
    chapters?: Number[];
    fav?: boolean;
  }) =>
    update((store) => {
      store.filters = { ...store.filters, ...options };
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
