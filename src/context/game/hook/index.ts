import { createContext, useContext } from "react";
import type { IGameContextValue } from "../interface";
import { initializeGrid } from "../../../shared/utils";

const GAME_CONTEXT_DEFAULT_VALUE: IGameContextValue = { grid: initializeGrid(), tiles: [] };

const GameContext = createContext(GAME_CONTEXT_DEFAULT_VALUE);

const useGameContext = () => useContext<IGameContextValue>(GameContext);

export { useGameContext, GameContext, GAME_CONTEXT_DEFAULT_VALUE };
