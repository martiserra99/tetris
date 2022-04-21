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
      background: "#f6f6f4",
      border: { size: 1, color: "#cacbc5" },
      corner: { type: "round", size: 5 },
    },
    block: {
      size: 25,
      border: 5,
      corner: 5,
      gap: 0,
    },
    button: {
      color: "#70716e",
      background: "#f6f6f4",
      border: { size: 1, color: "#cacbc5" },
      corner: { type: "round", size: 5 },
      font: {
        family: "Raleway, sans-serif",
        size: 16,
        weight: 600,
      },
      mousedown: { background: "#dddddc" },
    },
    text: {
      color: "#70716e",
      background: "rgba(0,0,0,0)",
      border: { size: 1, color: "#cacbc5" },
      corner: { type: "round", size: 5 },
      font: {
        family: "Raleway, sans-serif",
        size: 16,
        weight: 400,
      },
    },
  },
};
