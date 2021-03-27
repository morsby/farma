export const scrollTo = (y: number, opts?: { behavior: "smooth" }) => {
  document.querySelector("main").scroll({ top: y, behavior: "smooth" });
};
