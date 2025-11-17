import type { PropsWithChildren } from 'react';
import type { IGridTilesIds } from '../../../models/grid';
import type { ITile } from '../../../models/tile';
import type { EGameState } from '../../../shared/enum';

/**
 * @property {IGridTilesIds} grid - Двумерный массив сетки с id всех плиток
 * @property {ITile[]} tiles - Массив всех плиток
 */
interface IGameContextValue {
    grid: IGridTilesIds;
    tiles: ITile[];
    score: number;
    bestScore: number;
    gameState: EGameState;

    restartGame: () => void;
}

type IGameProviderProps = PropsWithChildren;

export type { IGameContextValue, IGameProviderProps };
