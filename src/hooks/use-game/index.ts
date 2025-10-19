import { useEffect, useReducer } from "react";
import { gameReducer } from "./reducer";
import { initializeGrid } from "../../shared/utils";
import { TILE_ANIMATION_DURATION, TILES_PER_ROW_COUNT } from "../../shared/const";
import { isEmpty, isNil, throttle } from "lodash-es";
import type { ICoordinates } from "../../shared/interface";
import type { EDirection } from "../../shared/enum";

const useGame = () => {
  const [state, dispatch] = useReducer(gameReducer, {
    grid: initializeGrid(),
    tiles: {},
    isStateUpdated: false,
  });

  const getEmptyTilesCoordinates = (): ICoordinates[] => {
    const emptyTilesCoordinates: ICoordinates[] = [];

    for (let row = 0; row < TILES_PER_ROW_COUNT; row++) {
      for (let column = 0; column < TILES_PER_ROW_COUNT; column++) {
        const tile = state.grid[row][column];

        if (isNil(tile)) emptyTilesCoordinates.push({ row, column });
      }
    }

    return emptyTilesCoordinates;
  };

  const appendTile = (): void => {
    const emptyTilesCoordinates = getEmptyTilesCoordinates();

    if (!isEmpty(emptyTilesCoordinates)) {
      const randomTileIndex = Math.floor(Math.random() * emptyTilesCoordinates.length);
      dispatch({ type: "create_tile", coordinates: emptyTilesCoordinates[randomTileIndex] });
    }
  };

  const startGame = (): void => {
    const emptyTilesCoordinates = getEmptyTilesCoordinates().sort(() => Math.random() - 0.5);

    dispatch({ type: "create_tile", coordinates: emptyTilesCoordinates[0] });
    dispatch({ type: "create_tile", coordinates: emptyTilesCoordinates[1] });
  };

  const moveTiles = throttle(
    (direction: EDirection): void => {
      dispatch({ type: "move_tiles", direction });
    },
    TILE_ANIMATION_DURATION,
    { trailing: false }
  );

  useEffect(() => {
    if (state.isStateUpdated) {
      setTimeout(() => {
        dispatch({ type: "merge_tiles" });
        appendTile();
      }, TILE_ANIMATION_DURATION);
    }
  }, [state.isStateUpdated]);

  return { ...state, startGame, moveTiles, appendTile };
};

export { useGame };
