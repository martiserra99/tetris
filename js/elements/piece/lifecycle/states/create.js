import canvasUI from "../../../../canvas-user-interface.js";

export const setupCreateLifecycleFunctions = function (piece) {
  piece.lifecycle.set("getElement", function (piece) {
    return canvasUI.layout.new("grid", "grid");
  });
};
