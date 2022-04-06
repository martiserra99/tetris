import { Piece } from "./classes/piece.js";

const I = () =>
  new Piece(
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
    ],
    "#277da1",
    "#237191"
  );

const J = () =>
  new Piece(
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ],
    "#f94144",
    "#e03b3d"
  );

const L = () =>
  new Piece(
    [
      { x: 2, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ],
    "#577590",
    "#4e6982"
  );

const O = () =>
  new Piece(
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
    ],
    "#f3722c",
    "#db6728"
  );

const S = () =>
  new Piece(
    [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ],
    "#4d908e",
    "#458280"
  );

const T = () =>
  new Piece(
    [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 0 },
      { x: 2, y: 1 },
    ],
    "#f8961e",
    "#df871b"
  );

const Z = () =>
  new Piece(
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ],
    "#f9c74f",
    "#e0b347"
  );

export const pieces = [I, J, L, O, S, T, Z];
