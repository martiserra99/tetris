import { canvasUI } from "../../../../canvas-ui/canvas-ui.js";

export const setupStartLifecycleFunctions = function (tetris) {
  tetris.lifecycle.set("updateElement", function (tetris, grid) {
    for (const child of [...grid.children]) grid.remove(child);

    const size = tetris.inner.call("getSize");
    grid.set("size", {
      width: { unit: "px", value: size.width },
      height: { unit: "px", value: size.height },
    });

    const dimensions = tetris.get("dimensions");
    grid.set("dimensions", {
      columns: [{ count: dimensions.columns, unit: "fr", value: 1 }],
      rows: [{ count: dimensions.rows, unit: "fr", value: 1 }],
    });

    const gap = tetris.get("gap");
    grid.set("gap", {
      size: { horizontal: gap.size, vertical: gap.size },
      color: gap.color,
    });

    const background = tetris.get("background");
    grid.set("background", background);

    const border = tetris.get("border");
    grid.set("border", border);

    const corner = tetris.get("corner");
    grid.set("corner", corner);

    tetris.inner.call("setupPieceElement", grid);
    tetris.inner.call("setupBlockElements", grid);
  });

  tetris.inner.fun("setupPieceElement", function (tetris, grid) {
    if (tetris.call("hasPiece")) {
      const piece = tetris.inner.call("buildPieceElement");
      tetris.inner.call("insertPieceElement", grid, piece);
    }
  });

  tetris.inner.fun("buildPieceElement", function (tetris, grid) {
    const pieceElement = canvasUI.composite.new("piece", "piece");

    const tetrisBlock = tetris.get("block");
    const tetrisGap = tetris.get("gap");
    const piece = tetris.inner.get("piece");

    pieceElement.set("positions", piece.piece.positions);
    pieceElement.set("block", {
      size: tetrisBlock.size,
      background: piece.piece.background,
      border: {
        size: tetrisBlock.border,
        color: piece.piece.border,
      },
      corner: {
        type: "round",
        size: tetrisBlock.corner,
      },
    });
    pieceElement.set("gap", tetrisGap.size);

    return pieceElement;
  });

  tetris.inner.fun("insertPieceElement", function (tetris, grid, pieceElement) {
    const piece = tetris.inner.get("piece");
    const { x, y } = piece.position;
    const { columns, rows } = piece.piece.span;
    grid.insert(pieceElement);
    pieceElement.layoutParams.set("position", { column: x, row: y });
    pieceElement.layoutParams.set("span", { columns, rows });
  });

  tetris.inner.fun("setupBlockElements", function (tetris, grid) {
    const blocks = tetris.inner.get("blocks");
    for (const [index, block] of blocks.entries()) {
      const blockElement = tetris.inner.call("buildBlockElement", index, block);
      tetris.inner.call(
        "insertBlockElement",
        grid,
        blockElement,
        block.position
      );
    }
  });

  tetris.inner.fun("buildBlockElement", function (tetris, index, block) {
    const blockElement = canvasUI.view.new(`block-${index}`, "area");

    const tetrisBlock = tetris.get("block");

    blockElement.set("background", block.block.background);
    blockElement.set("size", {
      width: { unit: "px", value: tetrisBlock.size },
      height: { unit: "px", value: tetrisBlock.size },
    });
    blockElement.set("border", {
      size: tetrisBlock.border,
      color: block.block.border,
    });
    blockElement.set("corner", {
      type: "round",
      size: tetrisBlock.corner,
    });

    return blockElement;
  });

  tetris.inner.fun(
    "insertBlockElement",
    function (tetris, grid, block, position) {
      const { x, y } = position;
      grid.insert(block);
      block.layoutParams.set("position", { column: x, row: y });
    }
  );
};
