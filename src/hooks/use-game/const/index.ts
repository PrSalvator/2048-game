import { EGameState } from "../../../shared/enum";
import { initializeGrid } from "../../../shared/utils";
import type { IGameReducerState } from "../reducer/interface";

const INITIAL_REDUCER_STATE: IGameReducerState = {
  grid: initializeGrid(),
  tiles: {},
  isStateUpdated: false,
  score: 0,
  gameState: EGameState.PLAYING,
};

export { INITIAL_REDUCER_STATE };
