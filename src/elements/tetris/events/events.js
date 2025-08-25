export const setupEvents = function (tetris) {
  tetris.events.set("leftdown", function (tetris, signal, state) {
    if (signal.type !== "keydown") return { event: false };
    if (signal.data !== "ArrowLeft" && signal.data !== "a")
      return { event: false };
    return { event: true };
  });

  tetris.events.set("leftup", function (tetris, signal, state) {
    if (signal.type !== "keyup") return { event: false };
    if (signal.data !== "ArrowLeft" && signal.data !== "a")
      return { event: false };
    return { event: true };
  });

  tetris.events.set("rightdown", function (tetris, signal, state) {
    if (signal.type !== "keydown") return { event: false };
    if (signal.data !== "ArrowRight" && signal.data !== "d")
      return { event: false };
    return { event: true };
  });

  tetris.events.set("rightup", function (tetris, signal, state) {
    if (signal.type !== "keyup") return { event: false };
    if (signal.data !== "ArrowRight" && signal.data !== "d")
      return { event: false };
    return { event: true };
  });

  tetris.events.set("downdown", function (tetris, signal, state) {
    if (signal.type !== "keydown") return { event: false };
    if (signal.data !== "ArrowDown" && signal.data !== "s")
      return { event: false };
    return { event: true };
  });

  tetris.events.set("downup", function (tetris, signal, state) {
    if (signal.type !== "keyup") return { event: false };
    if (signal.data !== "ArrowDown" && signal.data !== "s")
      return { event: false };
    return { event: true };
  });

  tetris.events.set("updown", function (tetris, signal, state) {
    if (signal.type !== "keydown") return { event: false };
    if (signal.data !== "ArrowUp" && signal.data !== "w")
      return { event: false };
    return { event: true };
  });

  tetris.events.set("upup", function (tetris, signal, state) {
    if (signal.type !== "keyup") return { event: false };
    if (signal.data !== "ArrowUp" && signal.data !== "w")
      return { event: false };
    return { event: true };
  });
};
