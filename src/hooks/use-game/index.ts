import { useEffect, useReducer } from "react";
import { gameReducer } from "./reducer";
import { initializeGrid } from "../../shared/utils";
import { TILE_ANIMATION_DURATION, TILES_PER_ROW_COUNT, WIN_TILE_VALUE } from "../../shared/const";
import { isEmpty, isNil, throttle } from "lodash-es";
import type { ICoordinates } from "../../shared/interface";
import { EGameState, type EDirection } from "../../shared/enum";
import type { ITileMap } from "../../models/tile";

const useGame = () => {
  const [state, dispatch] = useReducer(gameReducer, {
    grid: initializeGrid(),
    tiles: {},
    isStateUpdated: false,
    score: 0,
    gameState: EGameState.PLAYING,
  });

  const setWonState = () => {
    dispatch({ type: "set_game_state", gameState: EGameState.WON });
  };

  const setLostState = () => {
    dispatch({ type: "set_game_state", gameState: EGameState.LOST });
  };

  const checkGameState = () => {
    const tilesMap: ITileMap = Object.values(state.tiles).reduce((result, tile) => {
      if (tile.value === WIN_TILE_VALUE) setWonState();

      const key = `${tile.coordinates.row}.${tile.coordinates.column}`;

      /**
       * Изменение состояния редьюсера просиходит при след перерисовке,
       * поэтому в state.tiles оказываются плитки до слияния, исключаем их
       */

      if (result[key]?.value > tile.value) return result;

      return { ...result, [key]: tile };
    }, {} as ITileMap);

    const tilesArray = Object.values(tilesMap);

    // Быстрая проверка на пустые клетки
    if (tilesArray.length < TILES_PER_ROW_COUNT * TILES_PER_ROW_COUNT) return;

    tilesArray.forEach((tile) => {
      const {
        value,
        coordinates: { row, column },
      } = tile;

      if (row < TILES_PER_ROW_COUNT - 1) {
        // Проверка правого соседа
        const rightTile = tilesMap[`${row}.${column + 1}`];

        if (rightTile.value === value) return;
      }

      if (column < TILES_PER_ROW_COUNT - 1) {
        // Проверка нижнего соседа
        const bottomTile = tilesMap[`${row + 1}.${column}`];
        if (bottomTile.value === value) return;
      }
    });

    setLostState();
  };

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

  //TOOD: Пересмотреть вызов фукнций в useEffect
  useEffect(() => {
    if (state.isStateUpdated) {
      setTimeout(() => {
        dispatch({ type: "merge_tiles" });
        appendTile();
        checkGameState();
      }, TILE_ANIMATION_DURATION);
    }
  }, [state.isStateUpdated]);

  return { ...state, startGame, moveTiles, appendTile };
};

export { useGame };
