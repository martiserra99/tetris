export const setupUtilsFunctions = function (piece) {
  piece.inner.fun("getSize", function (piece) {
    const block = piece.get("block");
    const gap = piece.get("gap");

    const numColumns = piece.call("getNumColumns");
    const numRows = piece.call("getNumRows");

    const width = block.size * numColumns + gap * (numColumns - 1);
    const height = block.size * numRows + gap * (numRows - 1);

    return { width, height };
  });
};
