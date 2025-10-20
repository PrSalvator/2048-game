import type { ActionDispatch } from "react";
import type { IGameReducerAction, IGameReducerState } from "../use-game/reducer/interface";
import { EGameState } from "../../shared/enum";
import { WIN_TILE_VALUE } from "../../shared/const";
import { checkMovePossibility, getEmptyTilesCoordinates } from "../../shared/utils";
import type { ITileMap } from "../../models/tile";

const useGameState = (
  state: IGameReducerState,
  dispatch: ActionDispatch<[action: IGameReducerAction]>
) => {
  const setWonState = () => {
    dispatch({ type: "set_game_state", gameState: EGameState.WON });
  };

  const setLostState = () => {
    dispatch({ type: "set_game_state", gameState: EGameState.LOST });
  };

  const checkGameState = (): void => {
    const tilesArray = Object.values(state.tiles);

    if (tilesArray.some((tile) => tile.value === WIN_TILE_VALUE)) {
      setWonState();
      return;
    }

    const tilesMap: ITileMap = Object.values(state.tiles).reduce((result, tile) => {
      if (tile.value === WIN_TILE_VALUE) setWonState();

      const key = `${tile.coordinates.row}.${tile.coordinates.column}`;

      return { ...result, [key]: tile };
    }, {} as ITileMap);

    const isMovePossible = checkMovePossibility(tilesMap);

    if (!isMovePossible) setLostState();
  };

  const startGame = (): void => {
    const emptyTilesCoordinates = getEmptyTilesCoordinates(state.grid).sort(
      () => Math.random() - 0.5
    );

    dispatch({ type: "create_tile", coordinates: emptyTilesCoordinates[0] });
    dispatch({ type: "create_tile", coordinates: emptyTilesCoordinates[1] });
  };

  return { checkGameState, startGame };
};

export { useGameState };
