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

export { EDirection, EKeyboardKey, ELocalStorageKey, EGameState };
