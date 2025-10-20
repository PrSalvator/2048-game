import { useCallback, useEffect, useMemo, useRef } from "react";
import { useGame } from "../../../hooks/use-game";
import { GameContext } from "../hook";
import type { IGameProviderProps } from "../interface";
import { EDirection, EGameState, EKeyboardKey, ELocalStorageKey } from "../../../shared/enum";
import { LocalStorageService } from "../../../shared/services/local-storage";
import { isNil } from "lodash-es";

const localStorageService = new LocalStorageService();

const bestScore = localStorageService.get<number>(ELocalStorageKey.BEST_SCORE);

const GameProvider = ({ children }: IGameProviderProps) => {
  const initialized = useRef(false);
  const { grid, tiles, score, moveTiles, gameState, startGame, restartGame } = useGame();

  const contextValue = useMemo(() => {
    return {
      grid,
      tiles: Object.values(tiles),
      score,
      bestScore: isNil(bestScore) ? score : bestScore,
      gameState,

      restartGame,
    };
  }, [grid, tiles, score, gameState, restartGame]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent): void => {
      if (gameState !== EGameState.PLAYING) return;

      switch (e.key) {
        case EKeyboardKey.ARROW_DOWN: {
          moveTiles(EDirection.DOWN);
          break;
        }
        case EKeyboardKey.ARROW_TOP: {
          moveTiles(EDirection.TOP);
          break;
        }
        case EKeyboardKey.ARROW_LEFT: {
          moveTiles(EDirection.LEFT);
          break;
        }
        case EKeyboardKey.ARROW_RIGHT: {
          moveTiles(EDirection.RIGHT);
          break;
        }
      }
    },
    [gameState]
  );

  useEffect(() => {
    if (initialized.current === false) {
      startGame();
      initialized.current = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
};

export { GameProvider };
