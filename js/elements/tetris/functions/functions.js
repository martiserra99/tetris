export const setupFunctions = function (tetris) {
  tetris.fun("insertPiece", function (tetris, piece) {
    tetris.inner.set("piece", piece);
  });

  tetris.fun("hasPiece", function (tetris) {
    return tetris.inner.get("piece") !== null;
  });

  tetris.fun("getPiece", function (tetris) {
    return tetris.inner.get("piece");
  });

  tetris.fun("removePiece", function (tetris) {
    tetris.inner.set("piece", null);
  });

  tetris.fun("insertBlock", function (tetris, block) {
    tetris.inner.get("blocks").push(block);
  });

  tetris.fun("hasBlock", function (tetris, position) {
    const blocks = tetris.inner.get("blocks");
    return blocks.some(
      (el) => el.position.x === position.x && el.position.y === position.y
    );
  });

  tetris.fun("getBlock", function (tetris, position) {
    const blocks = tetris.inner.get("blocks");
    return blocks.find(
      (el) => el.position.x === position.x && el.position.y === position.y
    );
  });

  tetris.fun("removeBlock", function (tetris, position) {
    const blocks = tetris.inner.get("blocks");
    const result = blocks.filter(
      (el) => el.position.x !== position.x || el.position.y !== position.y
    );
    tetris.inner.set("blocks", result);
  });

  tetris.fun("getBlocks", function (tetris) {
    return tetris.inner.get("blocks");
  });

  tetris.fun("removeBlocks", function (tetris) {
    tetris.inner.set("blocks", []);
  });
};
