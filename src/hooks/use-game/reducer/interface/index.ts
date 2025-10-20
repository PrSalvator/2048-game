import type { IGridTilesIds } from "../../../../models/grid";
import type { ITileMap } from "../../../../models/tile";
import type { EDirection, EGameState } from "../../../../shared/enum";
import type { ICoordinates } from "../../../../shared/interface";

interface IGameReducerState {
  grid: IGridTilesIds;
  tiles: ITileMap;
  gameState: EGameState;

  score: number;

  isStateUpdated: boolean;
}

type IGameReducerAction =
  | { type: "create_tile"; coordinates: ICoordinates }
  | { type: "move_tiles"; direction: EDirection }
  | { type: "merge_tiles" }
  | { type: "set_game_state"; gameState: EGameState };

export type { IGameReducerState, IGameReducerAction };
