import canvasUI from "../../../../canvas-user-interface.js";

export const setupStartLifecycleFunctions = function (piece) {
  piece.lifecycle.set("updateElement", function (piece, grid) {
    for (const child of [...grid.children]) grid.remove(child);

    const size = piece.inner.call("getSize");
    grid.set("size", {
      width: { unit: "px", value: size.width },
      height: { unit: "px", value: size.height },
    });

    const numColumns = piece.call("getNumColumns");
    const numRows = piece.call("getNumRows");
    grid.set("dimensions", {
      columns: [{ count: numColumns, unit: "fr", value: 1 }],
      rows: [{ count: numRows, unit: "fr", value: 1 }],
    });

    const gap = piece.get("gap");
    grid.get("gap").size = { horizontal: gap, vertical: gap };

    piece.inner.call("setupBlocks", grid);
  });

  piece.inner.fun("setupBlocks", function (piece, grid) {
    const positions = piece.get("positions");
    for (const { x, y } of positions) {
      const block = piece.inner.call("buildBlock", { x, y });
      piece.inner.call("insertBlock", grid, block, { x, y });
    }
  });

  piece.inner.fun("buildBlock", function (piece, position) {
    const { x, y } = position;
    const block = canvasUI.view.new(`block-${x},${y}`, "area");
    block.set("size", {
      width: { unit: "%", value: 100 },
      height: { unit: "%", value: 100 },
    });
    const { background, border, corner } = piece.get("block");
    block.set("background", background);
    block.set("border", border);
    block.set("corner", corner);
    return block;
  });

  piece.inner.fun("insertBlock", function (piece, grid, block, position) {
    const { x, y } = position;
    grid.insert(block);
    block.layoutParams.set("position", { column: x, row: y });
  });
};
