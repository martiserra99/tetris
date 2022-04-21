export const config = {
  dimensions: { columns: 10, rows: 20 },
  delays: {
    down: {
      normal: 400,
      fast: 100,
    },
    horizontal: 100,
  },
  styles: {
    area: {
      background: "#edede9",
      border: { size: 3, color: "#d6ccc2" },
      corner: { type: "round", size: 5 },
    },
    block: {
      size: 25,
      border: 5,
      corner: 5,
      gap: 0,
    },
    button: {
      color: "#fff",
      background: "#968f88",
      border: { size: 0, color: "rgba(0,0,0,0)" },
      corner: { type: "round", size: 5 },
      font: {
        family: "Raleway, sans-serif",
        size: 16,
        weight: 600,
      },
      mousedown: { background: "#87817a" },
    },
    text: {
      color: "#968f88",
      background: "rgba(0,0,0,0)",
      border: { size: 1, color: "#968f88" },
      corner: { type: "round", size: 5 },
      font: {
        family: "Raleway, sans-serif",
        size: 16,
        weight: 400,
      },
    },
  },
};
