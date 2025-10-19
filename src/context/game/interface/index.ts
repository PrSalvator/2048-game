import type { PropsWithChildren } from "react";
import type { IGridTilesIds } from "../../../models/grid";
import type { ITile } from "../../../models/tile";

/**
 * @property {IGridTilesIds} grid - Двумерный массив сетки с id всех плиток
 * @property {ITile[]} tiles - Массив всех плиток
 */
interface IGameContextValue {
  grid: IGridTilesIds;
  tiles: ITile[];
}

type IGameProviderProps = PropsWithChildren;

export type { IGameContextValue, IGameProviderProps };
