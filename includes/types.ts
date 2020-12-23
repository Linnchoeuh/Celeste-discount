export type level = Array<number | block>;

// export type block = {
//   categorie: number,
//   sousCategorie: number,
//   collision: boolean,
//   x: number,
//   y: number
// }

export type block = [categorie, boolean, number, number];

export type categorie = [number, number];

export type bestUpRightLeft = [
  bestIteration,
  bestIteration,
  bestIteration,
  bestIteration
];
export type bestDown = [
  bestIteration,
  bestIteration,
  bestIteration,
  bestIteration,
  bestIteration
];

type bestIteration = number | boolean;