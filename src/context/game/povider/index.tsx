import { useEffect, useMemo, useRef } from "react";
import { useGame } from "../../../hooks/use-game";
import { GameContext } from "../hook";
import type { IGameProviderProps } from "../interface";
import { EDirection, EKeyboardKey } from "../../../shared/enum";

const GameProvider = ({ children }: IGameProviderProps) => {
  const initialized = useRef(false);
  const { grid, tiles, startGame, moveTiles } = useGame();

  const contextValue = useMemo(() => ({ grid, tiles: Object.values(tiles) }), [grid, tiles]);

  const handleKeyDown = (e: KeyboardEvent): void => {
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
  };

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
  }, []);

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
};

export { GameProvider };
