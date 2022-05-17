import canvasUI from "../../../../canvasui-js.js";

export const setupCreateLifecycleFunctions = function (piece) {
  piece.lifecycle.set("getElement", function (piece) {
    return canvasUI.layout.new("grid", "grid");
  });
};
