export const setupUtilsFunctions = function (tetris) {
  tetris.inner.fun("getSize", function (tetris) {
    const dimensions = tetris.get("dimensions");
    const block = tetris.get("block");
    const gap = tetris.get("gap");
    const border = tetris.get("border");

    const width =
      dimensions.columns * block.size +
      gap.size * (dimensions.columns - 1) +
      border.size * 2;

    const height =
      dimensions.rows * block.size +
      gap.size * (dimensions.rows - 1) +
      border.size * 2;

    return { width, height };
  });
};
