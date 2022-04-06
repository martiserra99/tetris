export class Piece {
  constructor(positions, background, border) {
    this.positions = positions;
    this.background = background;
    this.border = border;
  }

  get span() {
    return { columns: this.numColumns, rows: this.numRows };
  }

  get numColumns() {
    return (
      this.positions.reduce((acc, pos) => (acc < pos.x ? pos.x : acc), 0) + 1
    );
  }

  get numRows() {
    return (
      this.positions.reduce((acc, pos) => (acc < pos.y ? pos.y : acc), 0) + 1
    );
  }

  rotate() {
    const oldPositions = this.positions;
    const maxX = this.numColumns - 1;
    const newPositions = [];
    for (const { x, y } of oldPositions)
      newPositions.push({ x: y, y: maxX - x });
    this.positions = newPositions;
  }
}
