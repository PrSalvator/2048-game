import { useEffect, useReducer } from 'react';
import { gameReducer } from './reducer';
import { TILE_ANIMATION_DURATION } from '../../shared/const';
import { useGameState } from '../use-game-state';
import { useTileManagement } from '../use-tile-management';
import { INITIAL_REDUCER_STATE } from './const';

const useGame = () => {
    const [state, dispatch] = useReducer(gameReducer, INITIAL_REDUCER_STATE);

    const { checkGameState, startGame, restartGame } = useGameState(state, dispatch);
    const { appendTile, moveTiles } = useTileManagement(state, dispatch);

    useEffect(() => {
        if (state.isStateUpdated) {
            setTimeout(() => {
                dispatch({ type: 'merge_tiles' });
                appendTile();
            }, TILE_ANIMATION_DURATION);
        }
    }, [state.isStateUpdated]);

    useEffect(() => {
        if (!state.isStateUpdated) {
            checkGameState();
        }
    }, [state.isStateUpdated]);

    return { ...state, startGame, moveTiles, appendTile, restartGame };
};

export { useGame };
