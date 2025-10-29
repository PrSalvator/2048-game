import { useCallback } from "react";
import { EGameState, EDirection, EKeyboardKey } from "../../shared/enum";
import { useSwipe } from "../use-swipe";

export const useGameControls = (
  gameState: EGameState,
  moveTiles: (direction: EDirection) => void
) => {
  const handleMove = useCallback(
    (direction: EDirection) => {
      if (gameState !== EGameState.PLAYING) return;
      moveTiles(direction);
    },
    [gameState, moveTiles]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent): void => {
      switch (e.key) {
        case EKeyboardKey.ARROW_DOWN:
          handleMove(EDirection.DOWN);
          break;
        case EKeyboardKey.ARROW_TOP:
          handleMove(EDirection.TOP);
          break;
        case EKeyboardKey.ARROW_LEFT:
          handleMove(EDirection.LEFT);
          break;
        case EKeyboardKey.ARROW_RIGHT:
          handleMove(EDirection.RIGHT);
          break;
      }
    },
    [handleMove]
  );

  const { handleTouchStart } = useSwipe(handleMove);

  return {
    handleKeyDown,
    handleTouchStart,
  };
};
