import canvasUI from "../../../../canvas-user-interface.js";

export const setupCreateLifecycleFunctions = function (tetris) {
  tetris.lifecycle.set("getElement", function (tetris) {
    return canvasUI.layout.new("grid", "grid");
  });
};
