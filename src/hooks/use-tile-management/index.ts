import { isEmpty, throttle } from "lodash-es";
import type { ActionDispatch } from "react";
import { TILE_ANIMATION_DURATION } from "../../shared/const";
import type { EDirection } from "../../shared/enum";

import type { IGameReducerState, IGameReducerAction } from "../use-game/reducer/interface";
import { getEmptyTilesCoordinates } from "../../shared/utils";

const useTileManagement = (
  state: IGameReducerState,
  dispatch: ActionDispatch<[action: IGameReducerAction]>
) => {
  const appendTile = (): void => {
    const emptyTilesCoordinates = getEmptyTilesCoordinates(state.grid);

    if (!isEmpty(emptyTilesCoordinates)) {
      const randomTileIndex = Math.floor(Math.random() * emptyTilesCoordinates.length);
      dispatch({ type: "create_tile", coordinates: emptyTilesCoordinates[randomTileIndex] });
    }
  };

  const moveTiles = throttle(
    (direction: EDirection): void => {
      dispatch({ type: "move_tiles", direction });
    },
    TILE_ANIMATION_DURATION,
    { trailing: false }
  );

  return { moveTiles, appendTile };
};

export { useTileManagement };
