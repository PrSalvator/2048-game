import type { ICoordinates } from "../../shared/interface";

interface ITile {
  id: string;
  value: number;
  coordinates: ICoordinates;
}

type IEmptyTile = Pick<ITile, "coordinates">;

type ITileMap = Record<string, ITile>;

export type { ITile, IEmptyTile, ITileMap };
