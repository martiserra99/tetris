import { canvasUI } from "../../../../canvas-ui/canvas-ui.js";

export const setupCreateLifecycleFunctions = function (tetris) {
  tetris.lifecycle.set("getElement", function (tetris) {
    return canvasUI.layout.new("grid", "grid");
  });
};
