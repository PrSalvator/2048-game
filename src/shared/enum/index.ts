enum EDirection {
  LEFT = "left",
  RIGHT = "right",
  TOP = "top",
  DOWN = "down",
}

enum EKeyboardKey {
  ARROW_DOWN = "ArrowDown",
  ARROW_TOP = "ArrowUp",
  ARROW_LEFT = "ArrowLeft",
  ARROW_RIGHT = "ArrowRight",
}

enum ELocalStorageKey {
  BEST_SCORE = "BestScore",
}

enum EGameState {
  WON = "won",
  LOST = "lost",
  PLAYING = "playing",
}

enum EBreakPoint {
  DESKTOP = 1440,
  LAPTOP = 860,
  PHONE = 320,
}

enum ETilseSize {
  XL = 132,
  L = 100,
  M = 54,
}

enum EGapSize {
  XL = 16,
  L = 12,
  M = 8,
}

export {
  EDirection,
  EKeyboardKey,
  ELocalStorageKey,
  EGameState,
  EBreakPoint,
  ETilseSize,
  EGapSize,
};
