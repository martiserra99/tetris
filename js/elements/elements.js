import { newCompositePiece } from "./piece/piece.js";
import { newCompositeTetris } from "./tetris/tetris.js";

export const setupNewElements = function () {
  newCompositePiece();
  newCompositeTetris();
};
