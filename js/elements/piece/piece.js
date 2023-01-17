import canvasUI from "../../canvas-user-interface.js";

import { setupLifecycleFunctions } from "./lifecycle/lifecycle.js";
import { setupFunctions } from "./functions/functions.js";

export const newCompositePiece = function () {
  const piece = canvasUI.composite.newType("piece");

  piece.set("positions", [{ x: 0, y: 0 }]);
  piece.set("block", {
    size: 35,
    background: "#000",
    border: { color: "#000", size: 0 },
    corner: { type: "cut", size: 0 },
  });
  piece.set("gap", 0);

  setupLifecycleFunctions(piece);
  setupFunctions(piece);
};
