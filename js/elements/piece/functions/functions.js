export const setupFunctions = function (piece) {
  piece.fun("getNumColumns", function (piece) {
    const positions = piece.get("positions");
    return positions.reduce((acc, pos) => (acc < pos.x ? pos.x : acc), 0) + 1;
  });

  piece.fun("getNumRows", function (piece) {
    const positions = piece.get("positions");
    return positions.reduce((acc, pos) => (acc < pos.y ? pos.y : acc), 0) + 1;
  });
};
