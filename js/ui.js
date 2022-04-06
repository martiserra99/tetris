import { canvasUI } from "./canvas-ui/canvas-ui.js";
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
  scoreText.set("border", { size: 1, color: "#968f88" });
  scoreText.set("color", "#968f88");
  scoreText.get("font").family = "Raleway, sans-serif";
  scoreText.get("font").size = 16;
  scoreText.get("font").weight = 400;
  scoreText.set("corner", { type: "round", size: 5 });

  aside.insert(scoreText);

  playButton = canvasUI.composite.new("playButton", "textArea");
  playButton.set("size", {
    width: { unit: "%", value: 100 },
    height: { unit: "px", value: 50 },
  });
  playButton.set("text", "Play");
  playButton.set("background", "#968f88");
  playButton.set("color", "#fff");
  playButton.get("font").family = "Raleway, sans-serif";
  playButton.get("font").size = 16;
  playButton.get("font").weight = 600;
  playButton.set("corner", { type: "round", size: 5 });

  playButton.listeners.add("mouseenter", function (playButton) {
    playButton.set("background", "#87817a");
  });
  playButton.listeners.add("mouseleave", function (playButton) {
    playButton.set("background", "#968f88");
  });

  aside.insert(playButton);

  tetris = canvasUI.composite.new("tetris", "tetris");
  tetris.set("dimensions", config.dimensions);
  tetris.set("block", {
    size: config.block.size,
    border: config.block.border,
    corner: config.block.corner,
  });
  tetris.set("gap", { size: config.gap, color: "rgba(0,0,0,0)" });
  tetris.set("background", config.background);
  tetris.set("border", config.border);
  tetris.set("corner", { type: "round", size: config.corner });

  game.insert(tetris);

  pieceContainer = canvasUI.layout.new("pieceContainer", "frame");
  pieceContainer.set("size", {
    width: { unit: "px", value: 150 },
    height: { unit: "px", value: 150 },
  });
  pieceContainer.set("background", config.background);
  pieceContainer.set("border", config.border);
  pieceContainer.set("corner", { type: "round", size: config.corner });

  game.insert(pieceContainer);

  adaptUserInterfaceWithSize();

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
    size: config.block.size,
    background: piece.background,
    border: { size: config.block.border, color: piece.border },
    corner: { type: "round", size: config.block.corner },
  });
  pieceElement.set("gap", config.gap);
  return pieceElement;
};

const insertNextPiece = function (piece) {
  pieceContainer.insert(piece);
  piece.layoutParams.set("align", { horizontal: "middle", vertical: "middle" });
};

export const showScore = function (score) {
  scoreText.set("text", "Score: " + score);
};

const adaptUserInterfaceWithSize = function () {
  const adaptUI = function () {
    const width = window.innerWidth;
    if (width < 800) {
      game.remove(aside);
    } else {
      if (game.find("aside") === null) {
        game.insert(aside);
        aside.layoutParams.set("position", -1);
      }
    }
    if (width < 500) {
      game.remove(pieceContainer);
    } else {
      if (game.find("pieceContainer") === null) {
        game.insert(pieceContainer);
      }
    }
  };
  setTimeout(() => adaptUI(), 0);
  window.addEventListener("resize", () => adaptUI());
};
