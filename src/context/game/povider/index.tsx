import { useEffect, useMemo, useRef } from "react";
import { useGame } from "../../../hooks/use-game";
import { GameContext } from "../hook";
import type { IGameProviderProps } from "../interface";
import { useGameScore } from "../../../hooks/use-game-score";
import { useGameControls } from "../../../hooks/use-game-controls";

const GameProvider = ({ children }: IGameProviderProps) => {
  const initialized = useRef(false);
  const { grid, tiles, score, moveTiles, gameState, startGame, restartGame } = useGame();
  const { bestScore } = useGameScore(score);

  const { handleKeyDown, handleTouchStart } = useGameControls(gameState, moveTiles);

  const contextValue = useMemo(() => {
    return {
      grid,
      tiles: Object.values(tiles),
      score,
      bestScore,
      gameState,
      restartGame,
    };
  }, [grid, tiles, score, gameState, bestScore, restartGame]);

  useEffect(() => {
    if (initialized.current === false) {
      startGame();
      initialized.current = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, [handleKeyDown, handleTouchStart]);

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
};

export { GameProvider };
