import canvasUI from "./canvasui-js.js";
import { config } from "./config.js";

let root;
let game;
let aside;
let scoreText;
let playButton;
let tetris;
let pieceContainer;

export const buildUserInterface = function () {
  const ui = canvasUI.ui.new("#ui");

  root = canvasUI.layout.new("root", "frame");

  ui.start(root);

  game = canvasUI.layout.new("game", "linear");
  game.set("size", { width: "auto", height: "auto" });
  game.set("direction", "horizontal");
  game.set("alignItems", "start");
  game.set("gap", 50);

  root.insert(game);
  game.layoutParams.set("align", { horizontal: "middle", vertical: "middle" });

  aside = canvasUI.layout.new("aside", "linear");
  aside.set("size", { width: { unit: "px", value: 150 }, height: "auto" });
  aside.set("direction", "vertical");
  aside.set("gap", 20);

  game.insert(aside);

  scoreText = canvasUI.composite.new("scoreText", "textArea");
  scoreText.set("size", {
    width: { unit: "%", value: 100 },
    height: { unit: "px", value: 50 },
  });
  scoreText.set("text", "Score: 0");
  scoreText.set("border", config.styles.text.border);
  scoreText.set("color", config.styles.text.color);
  scoreText.set("font", config.styles.text.font);
  scoreText.set("corner", config.styles.text.corner);

  aside.insert(scoreText);

  playButton = canvasUI.composite.new("playButton", "textArea");
  playButton.set("size", {
    width: { unit: "%", value: 100 },
    height: { unit: "px", value: 50 },
  });
  playButton.set("text", "Play");
  playButton.set("background", config.styles.button.background);
  playButton.set("color", config.styles.button.color);
  playButton.set("font", config.styles.button.font);
  playButton.set("border", config.styles.button.border);
  playButton.set("corner", config.styles.button.corner);

  playButton.listeners.add("mousedown", function () {
    playButton.set("background", config.styles.button.mousedown.background);
  });
  root.listeners.add("mouseup", function (playutton) {
    playButton.set("background", config.styles.button.background);
  });

  aside.insert(playButton);

  tetris = canvasUI.composite.new("tetris", "tetris");
  tetris.set("dimensions", config.dimensions);
  tetris.set("block", {
    size: config.styles.block.size,
    border: config.styles.block.border,
    corner: config.styles.block.corner,
  });
  tetris.set("gap", { size: config.styles.block.gap, color: "rgba(0,0,0,0)" });
  tetris.set("background", config.styles.area.background);
  tetris.set("border", config.styles.area.border);
  tetris.set("corner", config.styles.area.corner);

  game.insert(tetris);

  pieceContainer = canvasUI.layout.new("pieceContainer", "frame");
  pieceContainer.set("size", {
    width: { unit: "px", value: 150 },
    height: { unit: "px", value: 150 },
  });
  pieceContainer.set("background", config.styles.area.background);
  pieceContainer.set("border", config.styles.area.border);
  pieceContainer.set("corner", config.styles.area.corner);

  game.insert(pieceContainer);

  return root;
};

export const showNextPiece = function (piece) {
  removeNextPiece();
  insertNextPiece(buildNextPiece(piece));
};

const removeNextPiece = function () {
  let piece = pieceContainer.find("piece");
  if (piece) pieceContainer.remove(piece);
};

const buildNextPiece = function (piece) {
  const pieceElement = canvasUI.composite.new("piece", "piece");
  pieceElement.set("positions", piece.positions);
  pieceElement.set("block", {
    size: config.styles.block.size,
    background: piece.background,
    border: { size: config.styles.block.border, color: piece.border },
    corner: { type: "round", size: config.styles.block.corner },
  });
  pieceElement.set("gap", config.styles.block.gap);
  return pieceElement;
};

const insertNextPiece = function (piece) {
  pieceContainer.insert(piece);
  piece.layoutParams.set("align", { horizontal: "middle", vertical: "middle" });
};

export const showScore = function (score) {
  scoreText.set("text", "Score: " + score);
};
