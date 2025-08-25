import "./style.css";

import { setupNewElements } from "./elements/elements.js";
import { showNextPiece, showScore, buildUserInterface } from "./ui.js";
import { Block } from "./classes/block.js";
import {
  arrayOfNumbers,
  getTimestamp,
  randomBetweenNumbers,
  randomFromArray,
} from "./utils.js";
import { pieces } from "./pieces.js";
import { config } from "./config.js";

setupNewElements();

const root = buildUserInterface();

const tetris = root.find("tetris");
const playButton = root.find("playButton");

let animationId;
let score;
let times;
let delays;
let move;
let nextPiece;

const play = function () {
  initGlobalVariables();

  removeContentTetris();
  removeListeners();
  cancelAnimationFrame(animationId);

  const animate = () => {
    animationId = requestAnimationFrame(animate);
    step();
  };
  animate();

  addListeners();
};

const initGlobalVariables = function () {
  score = 0;
  times = { down: null, horizontal: null };
  delays = {
    down: config.delays.down.normal,
    horizontal: config.delays.horizontal,
  };
  move = { left: false, right: false, rotate: false };
  nextPiece = getNextPiece();
};

const removeContentTetris = function () {
  tetris.call("removePiece");
  tetris.call("removeBlocks");
};

const removeListeners = function () {
  tetris.listeners.removeAll("leftdown");
  tetris.listeners.removeAll("leftup");
  tetris.listeners.removeAll("rightdown");
  tetris.listeners.removeAll("rightup");
  tetris.listeners.removeAll("downdown");
  tetris.listeners.removeAll("downup");
  tetris.listeners.removeAll("updown");
};

const getNextPiece = function () {
  const piece = randomFromArray(pieces).value();
  for (let i = 0; i < randomBetweenNumbers(0, 3); i++) piece.rotate();
  return piece;
};

const step = function () {
  if (hasPiece()) {
    if (delayMoveHorizontalPassed())
      if (hasToMoveLeft()) moveLeft();
      else if (hasToMoveRight()) moveRight();
    if (hasToRotate()) rotate();
    if (delayMoveDownPassed()) {
      const moved = moveDown();
      if (!moved) pieceToBlocks();
    }
  } else {
    const inserted = insertPiece(nextPiece);
    if (inserted) {
      nextPiece = getNextPiece();
      showNextPiece(nextPiece);
    } else {
      return gameOver();
    }
  }
  const removed = removeRows();
  score += computePoints(removed);
  showScore(score);
};

const hasPiece = function () {
  return tetris.call("hasPiece");
};

const delayMoveHorizontalPassed = function () {
  const time = getTimestamp();
  if (times.horizontal !== null && time - times.horizontal < delays.horizontal)
    return false;
  times.horizontal = time;
  return true;
};

const hasToMoveLeft = function () {
  return move.left && !move.right;
};

const moveLeft = function () {
  delays.horizontal = config.delays.horizontal;
  const piece = tetris.call("getPiece");
  piece.position.x -= 1;
  if (validPiece(piece)) return;
  piece.position.x += 1;
};

const hasToMoveRight = function () {
  return move.right && !move.left;
};

const moveRight = function () {
  delays.horizontal = config.delays.horizontal;
  const piece = tetris.call("getPiece");
  piece.position.x += 1;
  if (validPiece(piece)) return;
  piece.position.x -= 1;
};

const hasToRotate = function () {
  return move.rotate;
};

const rotate = function () {
  move.rotate = false;
  const piece = tetris.call("getPiece");
  piece.piece.rotate();
  if (validPiece(piece)) return;
  for (let i = 0; i < 3; i++) piece.piece.rotate();
};

const delayMoveDownPassed = function () {
  const time = getTimestamp();
  if (times.down !== null && time - times.down < delays.down) return false;
  times.down = time;
  return true;
};

const moveDown = function () {
  const piece = tetris.call("getPiece");
  piece.position.y += 1;
  if (validPiece(piece)) return true;
  piece.position.y -= 1;
  return false;
};

const pieceToBlocks = function () {
  const piece = tetris.call("getPiece");
  tetris.call("removePiece");
  for (const position of piece.piece.positions) {
    const x = piece.position.x + position.x;
    const y = piece.position.y + position.y;
    const block = new Block(piece.piece.background, piece.piece.border);
    tetris.call("insertBlock", { position: { x, y }, block });
  }
};

const insertPiece = function (piece) {
  const xPositions = arrayOfNumbers(0, config.dimensions.columns);
  do {
    const { index, value } = randomFromArray(xPositions);
    const position = { x: value, y: 0 };
    if (validPiece({ position, piece })) {
      tetris.call("insertPiece", { position, piece });
      times.down = getTimestamp();
      return true;
    }
    xPositions.splice(index, 1);
  } while (xPositions.length > 0);
  return false;
};

const validPiece = function (piece) {
  if (!pieceInTetris(piece)) return false;
  if (pieceOverlapping(piece)) return false;
  return true;
};

const pieceInTetris = function (piece) {
  if (piece.position.x < 0) return false;
  if (piece.position.y < 0) return false;
  if (piece.position.x + piece.piece.span.columns > config.dimensions.columns)
    return false;
  if (piece.position.y + piece.piece.span.rows > config.dimensions.rows)
    return false;
  return true;
};

const pieceOverlapping = function (piece) {
  const blocks = tetris.call("getBlocks");
  for (const block of blocks) {
    const valid = piece.piece.positions.find(
      ({ x, y }) =>
        piece.position.x + x === block.position.x &&
        piece.position.y + y === block.position.y
    );
    if (valid) return true;
  }
  return false;
};

const gameOver = function () {
  cancelAnimationFrame(animationId);
};

const removeRows = function () {
  let removed = 0;
  for (let row = config.dimensions.rows - 1; row >= 0; row--)
    if (filledRow(row)) {
      removeRow(row);
      removed++;
      row++;
    }
  return removed;
};

const filledRow = function (row) {
  const blocks = tetris.call("getBlocks");
  for (let column = 0; column < 10; column++) {
    const hasBlock = blocks.some(({ position: { x, y } }) => {
      return x === column && y === row;
    });
    if (!hasBlock) return false;
  }
  return true;
};

const removeRow = function (row) {
  for (let column = 0; column < 10; column++)
    tetris.call("removeBlock", { x: column, y: row });
  for (let i = row - 1; i >= 0; i--) {
    for (let j = 0; j < 10; j++) {
      const position = { x: j, y: i };
      const block = tetris.call("getBlock", position);
      if (block) block.position.y += 1;
    }
  }
};

const computePoints = function (removed) {
  if (removed === 0) return 0;
  if (removed === 1) return 40;
  if (removed === 2) return 100;
  if (removed === 3) return 300;
  return 1200;
};

const addListeners = function () {
  tetris.listeners.add("leftdown", () => {
    delays.horizontal = 0;
    move.left = true;
  });

  tetris.listeners.add("leftup", () => (move.left = false));

  tetris.listeners.add("rightdown", () => {
    delays.horizontal = 0;
    move.right = true;
  });

  tetris.listeners.add("rightup", () => (move.right = false));

  tetris.listeners.add("downdown", () => {
    delays.down = config.delays.down.fast;
  });

  tetris.listeners.add("downup", () => {
    delays.down = config.delays.down.normal;
  });

  tetris.listeners.add("updown", () => (move.rotate = true));
};

play();

playButton.listeners.add("click", () => play());
