import canvasUI from "../../../../canvasui-js.js";

export const setupCreateLifecycleFunctions = function (tetris) {
  tetris.lifecycle.set("getElement", function (tetris) {
    return canvasUI.layout.new("grid", "grid");
  });
};
