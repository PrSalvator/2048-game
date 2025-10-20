import { useEffect, useReducer } from "react";
import { gameReducer } from "./reducer";
import { initializeGrid } from "../../shared/utils";
import { TILE_ANIMATION_DURATION } from "../../shared/const";
import { EGameState } from "../../shared/enum";
import { useGameState } from "../use-game-state";
import { useTileManagement } from "../use-tile-management";

const useGame = () => {
  const [state, dispatch] = useReducer(gameReducer, {
    grid: initializeGrid(),
    tiles: {},
    isStateUpdated: false,
    score: 0,
    gameState: EGameState.PLAYING,
  });

  const { checkGameState, startGame } = useGameState(state, dispatch);
  const { appendTile, moveTiles } = useTileManagement(state, dispatch);

  useEffect(() => {
    if (state.isStateUpdated) {
      setTimeout(() => {
        dispatch({ type: "merge_tiles" });
        appendTile();
      }, TILE_ANIMATION_DURATION);
    }
  }, [state.isStateUpdated]);

  useEffect(() => {
    if (!state.isStateUpdated) {
      checkGameState();
    }
  }, [state.isStateUpdated]);

  return { ...state, startGame, moveTiles, appendTile };
};

export { useGame };
