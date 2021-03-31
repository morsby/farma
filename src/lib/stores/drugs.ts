import type { Drug } from "$lib/data";
import { writable } from "svelte/store";

let favourites = {};
if (typeof localStorage !== "undefined") {
  favourites = JSON.parse(localStorage.getItem("favourites") || "{}");
}

let open = {};
if (typeof localStorage !== "undefined") {
  open = JSON.parse(localStorage.getItem("open") || "{}");
}

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
export const filter = writable("");
