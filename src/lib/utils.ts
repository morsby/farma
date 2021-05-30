export const scrollTo = (y: number, opts?: { behavior: "smooth" }) => {
  document.querySelector("main").scroll({ top: y, behavior: "smooth" });
};

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
export const shuffle = (a: any[]) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
