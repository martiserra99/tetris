import canvasUI from "canvas-user-interface";
import { setupEvents } from "./events/events.js";
import { setupFunctions } from "./functions/functions.js";
import { setupLifecycleFunctions } from "./lifecycle/lifecycle.js";

export const newCompositeTetris = function () {
  const tetris = canvasUI.composite.newType("tetris");

  tetris.set("dimensions", { columns: 10, rows: 20 });
  tetris.set("block", {
    size: 35,
    border: 0,
    corner: 0,
  });
  tetris.set("gap", { size: 1, color: "#fff" });
  tetris.set("background", "#f0f0f0");
  tetris.set("border", { color: "#000", size: 0 });
  tetris.set("corner", { type: "cut", size: 0 });

  tetris.inner.set("piece", null);
  tetris.inner.set("blocks", []);

  setupLifecycleFunctions(tetris);
  setupFunctions(tetris);
  setupEvents(tetris);
};
