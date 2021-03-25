import type { Drug } from "$lib/data";
import { writable } from "svelte/store";

function createDrugs() {
  const { subscribe, set, update } = writable([]);

  const fetched = (data: Drug[]) => {
    const drugs = data.map((drug) => {
      drug.open = false;
      return drug;
    });

    set(drugs);
  };

  const toggle = (drugName) =>
    update((drugs) => {
      const index = drugs.findIndex((drug) => drug.name === drugName);
      drugs[index].open = !drugs[index].open;
      return drugs;
    });

  return {
    subscribe,
    fetched,
    toggle,
  };
}

export const drugs = createDrugs();
