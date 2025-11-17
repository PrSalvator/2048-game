import { createContext, useContext } from 'react';
import type { IGameContextValue } from '../interface';
import { initializeGrid } from '../../../shared/utils';
import { EGameState } from '../../../shared/enum';
import { noop } from 'lodash-es';

const GAME_CONTEXT_DEFAULT_VALUE: IGameContextValue = {
    grid: initializeGrid(),
    tiles: [],
    score: 0,
    bestScore: 0,
    gameState: EGameState.PLAYING,

    restartGame: noop,
};

const GameContext = createContext(GAME_CONTEXT_DEFAULT_VALUE);

const useGameContext = () => useContext<IGameContextValue>(GameContext);

export { useGameContext, GameContext, GAME_CONTEXT_DEFAULT_VALUE };
