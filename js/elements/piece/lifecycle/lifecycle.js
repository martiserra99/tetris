import { setupUtilsFunctions } from "./utils.js";
import { setupCreateLifecycleFunctions } from "./states/create.js";
import { setupStartLifecycleFunctions } from "./states/start.js";

export const setupLifecycleFunctions = function (piece) {
  setupUtilsFunctions(piece);
  setupCreateLifecycleFunctions(piece);
  setupStartLifecycleFunctions(piece);
};
