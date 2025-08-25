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
      background: "#F5F5F5",
      border: { size: 5, color: "#E0E0E0" },
      corner: { type: "round", size: 10 },
    },
    block: {
      size: 25,
      border: 5,
      corner: 5,
      gap: 0,
    },
    button: {
      color: "#626262",
      background: "#F5F5F5",
      border: { size: 5, color: "#E0E0E0" },
      corner: { type: "round", size: 10 },
      font: {
        family: "Raleway, sans-serif",
        size: 16,
        weight: 600,
      },
      mousedown: { background: "#E0E0E0" },
    },
    text: {
      color: "#626262",
      background: "rgba(0,0,0,0)",
      border: { size: 5, color: "#E0E0E0" },
      corner: { type: "round", size: 10 },
      font: {
        family: "Raleway, sans-serif",
        size: 16,
        weight: 600,
      },
    },
  },
};
